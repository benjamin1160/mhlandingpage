/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "@prisma/client" {
  class PrismaClient {
    [key: string]: any;
    constructor();
    $disconnect(): Promise<void>;
    $connect(): Promise<void>;
  }
  export { PrismaClient };
}
