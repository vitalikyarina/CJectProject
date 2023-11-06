export type FPromise<T> = () => Promise<T>;

export class CJPQueue {
  private count: number;
  private queueData: FPromise<void>[] = [];
  constructor(count = 1) {
    this.count = count;
  }

  public async start(): Promise<void> {
    const workers = [];
    for (let i = 0; i < this.count; i++) {
      workers.push(this.worker());
    }
    await Promise.all(workers);
  }

  public add(data: FPromise<void>): void {
    this.queueData.push(data);
  }

  private async worker(): Promise<void> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (res, rej) => {
      if (this.queueData.length > 0) {
        const currentOperation = this.queueData.shift()!;
        try {
          await currentOperation();
          await this.worker();
          res();
        } catch {
          rej();
        }
      } else {
        res();
      }
    });
  }
}
