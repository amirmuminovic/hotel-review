import { AuditModel } from '../models';

class AuditService {
  // eslint-disable-next-line class-methods-use-this
  async recordAudit(data) {
    await AuditModel.create(data);
  }
}

export default AuditService;
