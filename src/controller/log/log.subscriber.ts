import { Connection, EntitySubscriberInterface, EventSubscriber, getManager, InsertEvent, RemoveEvent } from 'typeorm';
import { LogEntity } from '../../entity/log.entity';
import { AuthService } from '../../service/auth.service';
import { LogableEntity } from '../../entity/logable.entity';

@EventSubscriber()
export class LogSubscriber implements EntitySubscriberInterface<any> {
  constructor(readonly connection: Connection, private auth: AuthService) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return LogableEntity;
  }

  async afterInsert(event: InsertEvent<any>) {
    const manager = await getManager();
    return manager.save(LogEntity, this.prepareLog(event, 'CREATE'));
  }

  async afterUpdate(event: InsertEvent<any>) {
    const manager = await getManager();
    return manager.save(LogEntity, this.prepareLog(event, 'UPDATE'));
  }

  async beforeRemove(event: RemoveEvent<any>) {
    const manager = await getManager();
    return manager.save(LogEntity, this.prepareLog(event, 'DELETE'));
  }

  private prepareLog(event, type: string): LogEntity {
    const log = new LogEntity();
    log.action = type;
    log.user = this.auth ? this.auth.user.firstName : 'System';
    log.entity = event.entity.constructor.name;
    log.data = JSON.stringify(event.entity);
    return log;
  }
}
