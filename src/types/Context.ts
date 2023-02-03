import Request from 'fastify';
import Reply from 'fastify';
import { Session, SessionData } from '@fastify/secure-session';
// import { buildDataLoaders } from 'src/utils/dataLoaders'
import { Connection } from 'typeorm';

export type Context = {
  req: Request & {
    session: Session & Partial<SessionData> & { userId?: string }; //userId?: number !!!
  };
  res: typeof Reply;
  connection: Connection; // cái này dùng cho transacsion
  // dataLoaders: ReturnType<typeof buildDataLoaders>
};
