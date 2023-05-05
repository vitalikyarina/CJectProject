import { IBaseDatabaseDAO, IFindOptions } from "@cjp/shared";
import { FilterQuery, Model } from "mongoose";
import {
  defer,
  from,
  map,
  Observable,
  Observer,
  switchMap,
  tap,
  TeardownLogic,
} from "rxjs";

export class BaseMongoAPIService<T, TCreate, TUpdate>
  implements IBaseDatabaseDAO<T, TCreate, TUpdate>
{
  constructor(private readonly documentModel: Model<unknown>) {}

  public createOne(newDocument: TCreate): Observable<T> {
    const createdDoc$ = this.documentModel.create(newDocument);
    return defer(() => createdDoc$).pipe(
      map((document) => {
        return document.toObject() as T;
      }),
      //   switchMap((document) => {
      //     return this.findById(document._id, findByIdOptions);
      //   }),
    );
  }

  public find(
    queryConditions: FilterQuery<T> = {},
    options?: IFindOptions,
  ): Observable<T> {
    const selectPattern = "-__v";
    const data = this.documentModel
      .find(queryConditions)
      .select(selectPattern)
      .skip(options?.skip || 0)
      .limit(options?.limit || 0)
      .sort(options?.sort)
      .populate(options?.populate || []);

    const queryCursor = data.cursor();
    return new Observable((observer: Observer<T>): TeardownLogic => {
      return from(
        queryCursor.eachAsync((doc) => {
          try {
            observer.next(doc.toObject() as T);
          } catch (err) {
            observer.error(err);
          }
        }, {}),
      )
        .pipe(
          tap(() => {
            queryCursor.close();
            observer.complete();
          }),
        )
        .subscribe();
    });
  }

  public findById(id: string): Observable<T> {
    const selectPattern = "-__v";
    const data = this.documentModel.findById(id).select(selectPattern);

    const queryCursor = data.cursor();
    return defer(() => {
      const document = queryCursor.next();
      return document;
    }).pipe(
      map((document) => {
        queryCursor.close();
        return document.toObject() as T;
      }),
    );
  }

  public deleteOne(id: string): Observable<T> {
    const data = this.documentModel.deleteOne({ _id: id });
    const queryCursor = data.cursor();
    return defer(() => {
      return data;
    }).pipe(
      switchMap(() => {
        const document = queryCursor.next();
        return document;
      }),
      map((document) => {
        queryCursor.close();
        return document?.toObject() as T;
      }),
    );
  }

  public updateOne(
    queryConditions: FilterQuery<T>,
    updateData: TUpdate,
  ): Observable<T> {
    const data = this.documentModel.findOneAndUpdate(
      queryConditions,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      updateData!,
    );
    const queryCursor = data.cursor();
    return defer(() => {
      return data;
    }).pipe(
      switchMap(() => {
        const document = queryCursor.next();
        return document;
      }),
      map((document) => {
        queryCursor.close();
        return document.toObject() as T;
      }),
    );
  }

  public updateOneById(id: string, updateData: TUpdate): Observable<T> {
    return this.updateOne({ _id: id }, updateData);
  }
}
