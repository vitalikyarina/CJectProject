import { inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IBaseApiService } from "../interfaces";

export abstract class BaseApiService<
  Entity,
  CreateEntity = Entity,
  UpdateEntity = Entity,
> implements IBaseApiService<Entity, CreateEntity, UpdateEntity>
{
  protected apiPath!: string;
  protected http: HttpClient = inject(HttpClient);

  public getAll(): Observable<Entity[]> {
    return this.http.get<Entity[]>(`/api/${this.apiPath}`);
  }

  public getById(id: string): Observable<Entity> {
    return this.http.get<Entity>(`/api/${this.apiPath}/${id}`);
  }

  public createOne(entity: CreateEntity): Observable<Entity> {
    return this.http.post<Entity>(`/api/${this.apiPath}`, entity);
  }

  public updateOneById(
    id: string,
    updateEntity: UpdateEntity,
  ): Observable<Entity> {
    return this.http.patch<Entity>(`/api/${this.apiPath}/${id}`, updateEntity);
  }
}
