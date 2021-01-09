import { ErrorModel } from '../models';

class AuditService {
  // eslint-disable-next-line class-methods-use-this
  async recordError(data) {
    await ErrorModel.create(data);
  }
}

export default AuditService;
