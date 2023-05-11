import { WritableSignal, signal } from "@angular/core";
import { Observable, tap } from "rxjs";
import { IBaseApiService } from "../interfaces";

interface IArrayStoreConfig<
  Entity,
  CreateEntity,
  UpdateEntity,
  IdKey extends string = "id",
> {
  apiService: IBaseApiService<Entity, CreateEntity, UpdateEntity>;
  idKey: IdKey;
}

export class BaseArrayStore<
  Entity extends { [P in IdKey]: string | number },
  CreateEntity,
  UpdateEntity,
  IdKey extends string = "id",
> {
  public data: WritableSignal<Entity[]>;

  private api: IBaseApiService<Entity, CreateEntity, UpdateEntity>;
  private idKey: IdKey;

  constructor(
    config: IArrayStoreConfig<Entity, CreateEntity, UpdateEntity, IdKey>,
  ) {
    this.idKey = config.idKey;
    this.api = config.apiService;
    this.data = signal<Entity[]>([]);
  }

  public addElement(element: Entity): void {
    this.data.mutate((array) => array.push(element));
  }

  public removeTodo(id: number | string): void {
    this.data.mutate((array) =>
      array.filter((element) => element[this.idKey] !== id),
    );
  }

  public loadEntities(): Observable<Entity[]> {
    return this.api.getAll().pipe(tap((entities) => this.data.set(entities)));
  }
}
