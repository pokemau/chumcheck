
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Startup
 * 
 */
export type Startup = $Result.DefaultSelection<Prisma.$StartupPayload>
/**
 * Model CapsuleProposal
 * 
 */
export type CapsuleProposal = $Result.DefaultSelection<Prisma.$CapsuleProposalPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  Startup: 'Startup',
  Mentor: 'Mentor',
  Manager: 'Manager'
};

export type Role = (typeof Role)[keyof typeof Role]


export const QualificationStatus: {
  PENDING: 'PENDING',
  RATED: 'RATED',
  QUALIFIED: 'QUALIFIED'
};

export type QualificationStatus = (typeof QualificationStatus)[keyof typeof QualificationStatus]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type QualificationStatus = $Enums.QualificationStatus

export const QualificationStatus: typeof $Enums.QualificationStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.startup`: Exposes CRUD operations for the **Startup** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Startups
    * const startups = await prisma.startup.findMany()
    * ```
    */
  get startup(): Prisma.StartupDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.capsuleProposal`: Exposes CRUD operations for the **CapsuleProposal** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CapsuleProposals
    * const capsuleProposals = await prisma.capsuleProposal.findMany()
    * ```
    */
  get capsuleProposal(): Prisma.CapsuleProposalDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Startup: 'Startup',
    CapsuleProposal: 'CapsuleProposal'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "startup" | "capsuleProposal"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Startup: {
        payload: Prisma.$StartupPayload<ExtArgs>
        fields: Prisma.StartupFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StartupFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StartupPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StartupFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StartupPayload>
          }
          findFirst: {
            args: Prisma.StartupFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StartupPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StartupFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StartupPayload>
          }
          findMany: {
            args: Prisma.StartupFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StartupPayload>[]
          }
          create: {
            args: Prisma.StartupCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StartupPayload>
          }
          createMany: {
            args: Prisma.StartupCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StartupCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StartupPayload>[]
          }
          delete: {
            args: Prisma.StartupDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StartupPayload>
          }
          update: {
            args: Prisma.StartupUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StartupPayload>
          }
          deleteMany: {
            args: Prisma.StartupDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StartupUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StartupUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StartupPayload>[]
          }
          upsert: {
            args: Prisma.StartupUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StartupPayload>
          }
          aggregate: {
            args: Prisma.StartupAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStartup>
          }
          groupBy: {
            args: Prisma.StartupGroupByArgs<ExtArgs>
            result: $Utils.Optional<StartupGroupByOutputType>[]
          }
          count: {
            args: Prisma.StartupCountArgs<ExtArgs>
            result: $Utils.Optional<StartupCountAggregateOutputType> | number
          }
        }
      }
      CapsuleProposal: {
        payload: Prisma.$CapsuleProposalPayload<ExtArgs>
        fields: Prisma.CapsuleProposalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CapsuleProposalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CapsuleProposalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CapsuleProposalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CapsuleProposalPayload>
          }
          findFirst: {
            args: Prisma.CapsuleProposalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CapsuleProposalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CapsuleProposalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CapsuleProposalPayload>
          }
          findMany: {
            args: Prisma.CapsuleProposalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CapsuleProposalPayload>[]
          }
          create: {
            args: Prisma.CapsuleProposalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CapsuleProposalPayload>
          }
          createMany: {
            args: Prisma.CapsuleProposalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CapsuleProposalCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CapsuleProposalPayload>[]
          }
          delete: {
            args: Prisma.CapsuleProposalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CapsuleProposalPayload>
          }
          update: {
            args: Prisma.CapsuleProposalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CapsuleProposalPayload>
          }
          deleteMany: {
            args: Prisma.CapsuleProposalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CapsuleProposalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CapsuleProposalUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CapsuleProposalPayload>[]
          }
          upsert: {
            args: Prisma.CapsuleProposalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CapsuleProposalPayload>
          }
          aggregate: {
            args: Prisma.CapsuleProposalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCapsuleProposal>
          }
          groupBy: {
            args: Prisma.CapsuleProposalGroupByArgs<ExtArgs>
            result: $Utils.Optional<CapsuleProposalGroupByOutputType>[]
          }
          count: {
            args: Prisma.CapsuleProposalCountArgs<ExtArgs>
            result: $Utils.Optional<CapsuleProposalCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    startup?: StartupOmit
    capsuleProposal?: CapsuleProposalOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    startups: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    startups?: boolean | UserCountOutputTypeCountStartupsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountStartupsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StartupWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    hash: string | null
    firstName: string | null
    lastName: string | null
    role: $Enums.Role | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    hash: string | null
    firstName: string | null
    lastName: string | null
    role: $Enums.Role | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    hash: number
    firstName: number
    lastName: number
    role: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    hash?: true
    firstName?: true
    lastName?: true
    role?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    hash?: true
    firstName?: true
    lastName?: true
    role?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    hash?: true
    firstName?: true
    lastName?: true
    role?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    hash: string
    firstName: string | null
    lastName: string | null
    role: $Enums.Role
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    hash?: boolean
    firstName?: boolean
    lastName?: boolean
    role?: boolean
    startups?: boolean | User$startupsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    hash?: boolean
    firstName?: boolean
    lastName?: boolean
    role?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    hash?: boolean
    firstName?: boolean
    lastName?: boolean
    role?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    hash?: boolean
    firstName?: boolean
    lastName?: boolean
    role?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "hash" | "firstName" | "lastName" | "role", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    startups?: boolean | User$startupsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      startups: Prisma.$StartupPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      hash: string
      firstName: string | null
      lastName: string | null
      role: $Enums.Role
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    startups<T extends User$startupsArgs<ExtArgs> = {}>(args?: Subset<T, User$startupsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StartupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly hash: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.startups
   */
  export type User$startupsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Startup
     */
    select?: StartupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Startup
     */
    omit?: StartupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StartupInclude<ExtArgs> | null
    where?: StartupWhereInput
    orderBy?: StartupOrderByWithRelationInput | StartupOrderByWithRelationInput[]
    cursor?: StartupWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StartupScalarFieldEnum | StartupScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Startup
   */

  export type AggregateStartup = {
    _count: StartupCountAggregateOutputType | null
    _avg: StartupAvgAggregateOutputType | null
    _sum: StartupSumAggregateOutputType | null
    _min: StartupMinAggregateOutputType | null
    _max: StartupMaxAggregateOutputType | null
  }

  export type StartupAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    qualificationStatus: number | null
  }

  export type StartupSumAggregateOutputType = {
    id: number | null
    userId: number | null
    qualificationStatus: number | null
  }

  export type StartupMinAggregateOutputType = {
    id: number | null
    name: string | null
    userId: number | null
    qualificationStatus: number | null
    dataPrivacy: boolean | null
    links: string | null
    groupName: string | null
    universityName: string | null
    eligibility: boolean | null
  }

  export type StartupMaxAggregateOutputType = {
    id: number | null
    name: string | null
    userId: number | null
    qualificationStatus: number | null
    dataPrivacy: boolean | null
    links: string | null
    groupName: string | null
    universityName: string | null
    eligibility: boolean | null
  }

  export type StartupCountAggregateOutputType = {
    id: number
    name: number
    userId: number
    qualificationStatus: number
    dataPrivacy: number
    links: number
    groupName: number
    universityName: number
    eligibility: number
    _all: number
  }


  export type StartupAvgAggregateInputType = {
    id?: true
    userId?: true
    qualificationStatus?: true
  }

  export type StartupSumAggregateInputType = {
    id?: true
    userId?: true
    qualificationStatus?: true
  }

  export type StartupMinAggregateInputType = {
    id?: true
    name?: true
    userId?: true
    qualificationStatus?: true
    dataPrivacy?: true
    links?: true
    groupName?: true
    universityName?: true
    eligibility?: true
  }

  export type StartupMaxAggregateInputType = {
    id?: true
    name?: true
    userId?: true
    qualificationStatus?: true
    dataPrivacy?: true
    links?: true
    groupName?: true
    universityName?: true
    eligibility?: true
  }

  export type StartupCountAggregateInputType = {
    id?: true
    name?: true
    userId?: true
    qualificationStatus?: true
    dataPrivacy?: true
    links?: true
    groupName?: true
    universityName?: true
    eligibility?: true
    _all?: true
  }

  export type StartupAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Startup to aggregate.
     */
    where?: StartupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Startups to fetch.
     */
    orderBy?: StartupOrderByWithRelationInput | StartupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StartupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Startups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Startups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Startups
    **/
    _count?: true | StartupCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StartupAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StartupSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StartupMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StartupMaxAggregateInputType
  }

  export type GetStartupAggregateType<T extends StartupAggregateArgs> = {
        [P in keyof T & keyof AggregateStartup]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStartup[P]>
      : GetScalarType<T[P], AggregateStartup[P]>
  }




  export type StartupGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StartupWhereInput
    orderBy?: StartupOrderByWithAggregationInput | StartupOrderByWithAggregationInput[]
    by: StartupScalarFieldEnum[] | StartupScalarFieldEnum
    having?: StartupScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StartupCountAggregateInputType | true
    _avg?: StartupAvgAggregateInputType
    _sum?: StartupSumAggregateInputType
    _min?: StartupMinAggregateInputType
    _max?: StartupMaxAggregateInputType
  }

  export type StartupGroupByOutputType = {
    id: number
    name: string
    userId: number
    qualificationStatus: number
    dataPrivacy: boolean
    links: string | null
    groupName: string | null
    universityName: string | null
    eligibility: boolean
    _count: StartupCountAggregateOutputType | null
    _avg: StartupAvgAggregateOutputType | null
    _sum: StartupSumAggregateOutputType | null
    _min: StartupMinAggregateOutputType | null
    _max: StartupMaxAggregateOutputType | null
  }

  type GetStartupGroupByPayload<T extends StartupGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StartupGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StartupGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StartupGroupByOutputType[P]>
            : GetScalarType<T[P], StartupGroupByOutputType[P]>
        }
      >
    >


  export type StartupSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    userId?: boolean
    qualificationStatus?: boolean
    dataPrivacy?: boolean
    links?: boolean
    groupName?: boolean
    universityName?: boolean
    eligibility?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    capsuleProposal?: boolean | Startup$capsuleProposalArgs<ExtArgs>
  }, ExtArgs["result"]["startup"]>

  export type StartupSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    userId?: boolean
    qualificationStatus?: boolean
    dataPrivacy?: boolean
    links?: boolean
    groupName?: boolean
    universityName?: boolean
    eligibility?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["startup"]>

  export type StartupSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    userId?: boolean
    qualificationStatus?: boolean
    dataPrivacy?: boolean
    links?: boolean
    groupName?: boolean
    universityName?: boolean
    eligibility?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["startup"]>

  export type StartupSelectScalar = {
    id?: boolean
    name?: boolean
    userId?: boolean
    qualificationStatus?: boolean
    dataPrivacy?: boolean
    links?: boolean
    groupName?: boolean
    universityName?: boolean
    eligibility?: boolean
  }

  export type StartupOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "userId" | "qualificationStatus" | "dataPrivacy" | "links" | "groupName" | "universityName" | "eligibility", ExtArgs["result"]["startup"]>
  export type StartupInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    capsuleProposal?: boolean | Startup$capsuleProposalArgs<ExtArgs>
  }
  export type StartupIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type StartupIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $StartupPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Startup"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      capsuleProposal: Prisma.$CapsuleProposalPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      userId: number
      qualificationStatus: number
      dataPrivacy: boolean
      links: string | null
      groupName: string | null
      universityName: string | null
      eligibility: boolean
    }, ExtArgs["result"]["startup"]>
    composites: {}
  }

  type StartupGetPayload<S extends boolean | null | undefined | StartupDefaultArgs> = $Result.GetResult<Prisma.$StartupPayload, S>

  type StartupCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StartupFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StartupCountAggregateInputType | true
    }

  export interface StartupDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Startup'], meta: { name: 'Startup' } }
    /**
     * Find zero or one Startup that matches the filter.
     * @param {StartupFindUniqueArgs} args - Arguments to find a Startup
     * @example
     * // Get one Startup
     * const startup = await prisma.startup.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StartupFindUniqueArgs>(args: SelectSubset<T, StartupFindUniqueArgs<ExtArgs>>): Prisma__StartupClient<$Result.GetResult<Prisma.$StartupPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Startup that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StartupFindUniqueOrThrowArgs} args - Arguments to find a Startup
     * @example
     * // Get one Startup
     * const startup = await prisma.startup.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StartupFindUniqueOrThrowArgs>(args: SelectSubset<T, StartupFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StartupClient<$Result.GetResult<Prisma.$StartupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Startup that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StartupFindFirstArgs} args - Arguments to find a Startup
     * @example
     * // Get one Startup
     * const startup = await prisma.startup.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StartupFindFirstArgs>(args?: SelectSubset<T, StartupFindFirstArgs<ExtArgs>>): Prisma__StartupClient<$Result.GetResult<Prisma.$StartupPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Startup that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StartupFindFirstOrThrowArgs} args - Arguments to find a Startup
     * @example
     * // Get one Startup
     * const startup = await prisma.startup.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StartupFindFirstOrThrowArgs>(args?: SelectSubset<T, StartupFindFirstOrThrowArgs<ExtArgs>>): Prisma__StartupClient<$Result.GetResult<Prisma.$StartupPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Startups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StartupFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Startups
     * const startups = await prisma.startup.findMany()
     * 
     * // Get first 10 Startups
     * const startups = await prisma.startup.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const startupWithIdOnly = await prisma.startup.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StartupFindManyArgs>(args?: SelectSubset<T, StartupFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StartupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Startup.
     * @param {StartupCreateArgs} args - Arguments to create a Startup.
     * @example
     * // Create one Startup
     * const Startup = await prisma.startup.create({
     *   data: {
     *     // ... data to create a Startup
     *   }
     * })
     * 
     */
    create<T extends StartupCreateArgs>(args: SelectSubset<T, StartupCreateArgs<ExtArgs>>): Prisma__StartupClient<$Result.GetResult<Prisma.$StartupPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Startups.
     * @param {StartupCreateManyArgs} args - Arguments to create many Startups.
     * @example
     * // Create many Startups
     * const startup = await prisma.startup.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StartupCreateManyArgs>(args?: SelectSubset<T, StartupCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Startups and returns the data saved in the database.
     * @param {StartupCreateManyAndReturnArgs} args - Arguments to create many Startups.
     * @example
     * // Create many Startups
     * const startup = await prisma.startup.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Startups and only return the `id`
     * const startupWithIdOnly = await prisma.startup.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StartupCreateManyAndReturnArgs>(args?: SelectSubset<T, StartupCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StartupPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Startup.
     * @param {StartupDeleteArgs} args - Arguments to delete one Startup.
     * @example
     * // Delete one Startup
     * const Startup = await prisma.startup.delete({
     *   where: {
     *     // ... filter to delete one Startup
     *   }
     * })
     * 
     */
    delete<T extends StartupDeleteArgs>(args: SelectSubset<T, StartupDeleteArgs<ExtArgs>>): Prisma__StartupClient<$Result.GetResult<Prisma.$StartupPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Startup.
     * @param {StartupUpdateArgs} args - Arguments to update one Startup.
     * @example
     * // Update one Startup
     * const startup = await prisma.startup.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StartupUpdateArgs>(args: SelectSubset<T, StartupUpdateArgs<ExtArgs>>): Prisma__StartupClient<$Result.GetResult<Prisma.$StartupPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Startups.
     * @param {StartupDeleteManyArgs} args - Arguments to filter Startups to delete.
     * @example
     * // Delete a few Startups
     * const { count } = await prisma.startup.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StartupDeleteManyArgs>(args?: SelectSubset<T, StartupDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Startups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StartupUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Startups
     * const startup = await prisma.startup.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StartupUpdateManyArgs>(args: SelectSubset<T, StartupUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Startups and returns the data updated in the database.
     * @param {StartupUpdateManyAndReturnArgs} args - Arguments to update many Startups.
     * @example
     * // Update many Startups
     * const startup = await prisma.startup.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Startups and only return the `id`
     * const startupWithIdOnly = await prisma.startup.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StartupUpdateManyAndReturnArgs>(args: SelectSubset<T, StartupUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StartupPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Startup.
     * @param {StartupUpsertArgs} args - Arguments to update or create a Startup.
     * @example
     * // Update or create a Startup
     * const startup = await prisma.startup.upsert({
     *   create: {
     *     // ... data to create a Startup
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Startup we want to update
     *   }
     * })
     */
    upsert<T extends StartupUpsertArgs>(args: SelectSubset<T, StartupUpsertArgs<ExtArgs>>): Prisma__StartupClient<$Result.GetResult<Prisma.$StartupPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Startups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StartupCountArgs} args - Arguments to filter Startups to count.
     * @example
     * // Count the number of Startups
     * const count = await prisma.startup.count({
     *   where: {
     *     // ... the filter for the Startups we want to count
     *   }
     * })
    **/
    count<T extends StartupCountArgs>(
      args?: Subset<T, StartupCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StartupCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Startup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StartupAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StartupAggregateArgs>(args: Subset<T, StartupAggregateArgs>): Prisma.PrismaPromise<GetStartupAggregateType<T>>

    /**
     * Group by Startup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StartupGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StartupGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StartupGroupByArgs['orderBy'] }
        : { orderBy?: StartupGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StartupGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStartupGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Startup model
   */
  readonly fields: StartupFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Startup.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StartupClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    capsuleProposal<T extends Startup$capsuleProposalArgs<ExtArgs> = {}>(args?: Subset<T, Startup$capsuleProposalArgs<ExtArgs>>): Prisma__CapsuleProposalClient<$Result.GetResult<Prisma.$CapsuleProposalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Startup model
   */
  interface StartupFieldRefs {
    readonly id: FieldRef<"Startup", 'Int'>
    readonly name: FieldRef<"Startup", 'String'>
    readonly userId: FieldRef<"Startup", 'Int'>
    readonly qualificationStatus: FieldRef<"Startup", 'Int'>
    readonly dataPrivacy: FieldRef<"Startup", 'Boolean'>
    readonly links: FieldRef<"Startup", 'String'>
    readonly groupName: FieldRef<"Startup", 'String'>
    readonly universityName: FieldRef<"Startup", 'String'>
    readonly eligibility: FieldRef<"Startup", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Startup findUnique
   */
  export type StartupFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Startup
     */
    select?: StartupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Startup
     */
    omit?: StartupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StartupInclude<ExtArgs> | null
    /**
     * Filter, which Startup to fetch.
     */
    where: StartupWhereUniqueInput
  }

  /**
   * Startup findUniqueOrThrow
   */
  export type StartupFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Startup
     */
    select?: StartupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Startup
     */
    omit?: StartupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StartupInclude<ExtArgs> | null
    /**
     * Filter, which Startup to fetch.
     */
    where: StartupWhereUniqueInput
  }

  /**
   * Startup findFirst
   */
  export type StartupFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Startup
     */
    select?: StartupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Startup
     */
    omit?: StartupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StartupInclude<ExtArgs> | null
    /**
     * Filter, which Startup to fetch.
     */
    where?: StartupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Startups to fetch.
     */
    orderBy?: StartupOrderByWithRelationInput | StartupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Startups.
     */
    cursor?: StartupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Startups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Startups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Startups.
     */
    distinct?: StartupScalarFieldEnum | StartupScalarFieldEnum[]
  }

  /**
   * Startup findFirstOrThrow
   */
  export type StartupFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Startup
     */
    select?: StartupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Startup
     */
    omit?: StartupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StartupInclude<ExtArgs> | null
    /**
     * Filter, which Startup to fetch.
     */
    where?: StartupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Startups to fetch.
     */
    orderBy?: StartupOrderByWithRelationInput | StartupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Startups.
     */
    cursor?: StartupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Startups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Startups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Startups.
     */
    distinct?: StartupScalarFieldEnum | StartupScalarFieldEnum[]
  }

  /**
   * Startup findMany
   */
  export type StartupFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Startup
     */
    select?: StartupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Startup
     */
    omit?: StartupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StartupInclude<ExtArgs> | null
    /**
     * Filter, which Startups to fetch.
     */
    where?: StartupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Startups to fetch.
     */
    orderBy?: StartupOrderByWithRelationInput | StartupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Startups.
     */
    cursor?: StartupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Startups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Startups.
     */
    skip?: number
    distinct?: StartupScalarFieldEnum | StartupScalarFieldEnum[]
  }

  /**
   * Startup create
   */
  export type StartupCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Startup
     */
    select?: StartupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Startup
     */
    omit?: StartupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StartupInclude<ExtArgs> | null
    /**
     * The data needed to create a Startup.
     */
    data: XOR<StartupCreateInput, StartupUncheckedCreateInput>
  }

  /**
   * Startup createMany
   */
  export type StartupCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Startups.
     */
    data: StartupCreateManyInput | StartupCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Startup createManyAndReturn
   */
  export type StartupCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Startup
     */
    select?: StartupSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Startup
     */
    omit?: StartupOmit<ExtArgs> | null
    /**
     * The data used to create many Startups.
     */
    data: StartupCreateManyInput | StartupCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StartupIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Startup update
   */
  export type StartupUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Startup
     */
    select?: StartupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Startup
     */
    omit?: StartupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StartupInclude<ExtArgs> | null
    /**
     * The data needed to update a Startup.
     */
    data: XOR<StartupUpdateInput, StartupUncheckedUpdateInput>
    /**
     * Choose, which Startup to update.
     */
    where: StartupWhereUniqueInput
  }

  /**
   * Startup updateMany
   */
  export type StartupUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Startups.
     */
    data: XOR<StartupUpdateManyMutationInput, StartupUncheckedUpdateManyInput>
    /**
     * Filter which Startups to update
     */
    where?: StartupWhereInput
    /**
     * Limit how many Startups to update.
     */
    limit?: number
  }

  /**
   * Startup updateManyAndReturn
   */
  export type StartupUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Startup
     */
    select?: StartupSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Startup
     */
    omit?: StartupOmit<ExtArgs> | null
    /**
     * The data used to update Startups.
     */
    data: XOR<StartupUpdateManyMutationInput, StartupUncheckedUpdateManyInput>
    /**
     * Filter which Startups to update
     */
    where?: StartupWhereInput
    /**
     * Limit how many Startups to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StartupIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Startup upsert
   */
  export type StartupUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Startup
     */
    select?: StartupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Startup
     */
    omit?: StartupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StartupInclude<ExtArgs> | null
    /**
     * The filter to search for the Startup to update in case it exists.
     */
    where: StartupWhereUniqueInput
    /**
     * In case the Startup found by the `where` argument doesn't exist, create a new Startup with this data.
     */
    create: XOR<StartupCreateInput, StartupUncheckedCreateInput>
    /**
     * In case the Startup was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StartupUpdateInput, StartupUncheckedUpdateInput>
  }

  /**
   * Startup delete
   */
  export type StartupDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Startup
     */
    select?: StartupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Startup
     */
    omit?: StartupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StartupInclude<ExtArgs> | null
    /**
     * Filter which Startup to delete.
     */
    where: StartupWhereUniqueInput
  }

  /**
   * Startup deleteMany
   */
  export type StartupDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Startups to delete
     */
    where?: StartupWhereInput
    /**
     * Limit how many Startups to delete.
     */
    limit?: number
  }

  /**
   * Startup.capsuleProposal
   */
  export type Startup$capsuleProposalArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CapsuleProposal
     */
    select?: CapsuleProposalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CapsuleProposal
     */
    omit?: CapsuleProposalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CapsuleProposalInclude<ExtArgs> | null
    where?: CapsuleProposalWhereInput
  }

  /**
   * Startup without action
   */
  export type StartupDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Startup
     */
    select?: StartupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Startup
     */
    omit?: StartupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StartupInclude<ExtArgs> | null
  }


  /**
   * Model CapsuleProposal
   */

  export type AggregateCapsuleProposal = {
    _count: CapsuleProposalCountAggregateOutputType | null
    _avg: CapsuleProposalAvgAggregateOutputType | null
    _sum: CapsuleProposalSumAggregateOutputType | null
    _min: CapsuleProposalMinAggregateOutputType | null
    _max: CapsuleProposalMaxAggregateOutputType | null
  }

  export type CapsuleProposalAvgAggregateOutputType = {
    id: number | null
    startupId: number | null
  }

  export type CapsuleProposalSumAggregateOutputType = {
    id: number | null
    startupId: number | null
  }

  export type CapsuleProposalMinAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    problemStatement: string | null
    targetMarket: string | null
    solutionDescription: string | null
    objectives: string | null
    scope: string | null
    methodology: string | null
    startupId: number | null
  }

  export type CapsuleProposalMaxAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    problemStatement: string | null
    targetMarket: string | null
    solutionDescription: string | null
    objectives: string | null
    scope: string | null
    methodology: string | null
    startupId: number | null
  }

  export type CapsuleProposalCountAggregateOutputType = {
    id: number
    title: number
    description: number
    problemStatement: number
    targetMarket: number
    solutionDescription: number
    objectives: number
    scope: number
    methodology: number
    startupId: number
    _all: number
  }


  export type CapsuleProposalAvgAggregateInputType = {
    id?: true
    startupId?: true
  }

  export type CapsuleProposalSumAggregateInputType = {
    id?: true
    startupId?: true
  }

  export type CapsuleProposalMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    problemStatement?: true
    targetMarket?: true
    solutionDescription?: true
    objectives?: true
    scope?: true
    methodology?: true
    startupId?: true
  }

  export type CapsuleProposalMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    problemStatement?: true
    targetMarket?: true
    solutionDescription?: true
    objectives?: true
    scope?: true
    methodology?: true
    startupId?: true
  }

  export type CapsuleProposalCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    problemStatement?: true
    targetMarket?: true
    solutionDescription?: true
    objectives?: true
    scope?: true
    methodology?: true
    startupId?: true
    _all?: true
  }

  export type CapsuleProposalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CapsuleProposal to aggregate.
     */
    where?: CapsuleProposalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CapsuleProposals to fetch.
     */
    orderBy?: CapsuleProposalOrderByWithRelationInput | CapsuleProposalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CapsuleProposalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CapsuleProposals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CapsuleProposals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CapsuleProposals
    **/
    _count?: true | CapsuleProposalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CapsuleProposalAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CapsuleProposalSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CapsuleProposalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CapsuleProposalMaxAggregateInputType
  }

  export type GetCapsuleProposalAggregateType<T extends CapsuleProposalAggregateArgs> = {
        [P in keyof T & keyof AggregateCapsuleProposal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCapsuleProposal[P]>
      : GetScalarType<T[P], AggregateCapsuleProposal[P]>
  }




  export type CapsuleProposalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CapsuleProposalWhereInput
    orderBy?: CapsuleProposalOrderByWithAggregationInput | CapsuleProposalOrderByWithAggregationInput[]
    by: CapsuleProposalScalarFieldEnum[] | CapsuleProposalScalarFieldEnum
    having?: CapsuleProposalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CapsuleProposalCountAggregateInputType | true
    _avg?: CapsuleProposalAvgAggregateInputType
    _sum?: CapsuleProposalSumAggregateInputType
    _min?: CapsuleProposalMinAggregateInputType
    _max?: CapsuleProposalMaxAggregateInputType
  }

  export type CapsuleProposalGroupByOutputType = {
    id: number
    title: string
    description: string
    problemStatement: string
    targetMarket: string
    solutionDescription: string
    objectives: string
    scope: string
    methodology: string
    startupId: number
    _count: CapsuleProposalCountAggregateOutputType | null
    _avg: CapsuleProposalAvgAggregateOutputType | null
    _sum: CapsuleProposalSumAggregateOutputType | null
    _min: CapsuleProposalMinAggregateOutputType | null
    _max: CapsuleProposalMaxAggregateOutputType | null
  }

  type GetCapsuleProposalGroupByPayload<T extends CapsuleProposalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CapsuleProposalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CapsuleProposalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CapsuleProposalGroupByOutputType[P]>
            : GetScalarType<T[P], CapsuleProposalGroupByOutputType[P]>
        }
      >
    >


  export type CapsuleProposalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    problemStatement?: boolean
    targetMarket?: boolean
    solutionDescription?: boolean
    objectives?: boolean
    scope?: boolean
    methodology?: boolean
    startupId?: boolean
    startup?: boolean | StartupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["capsuleProposal"]>

  export type CapsuleProposalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    problemStatement?: boolean
    targetMarket?: boolean
    solutionDescription?: boolean
    objectives?: boolean
    scope?: boolean
    methodology?: boolean
    startupId?: boolean
    startup?: boolean | StartupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["capsuleProposal"]>

  export type CapsuleProposalSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    problemStatement?: boolean
    targetMarket?: boolean
    solutionDescription?: boolean
    objectives?: boolean
    scope?: boolean
    methodology?: boolean
    startupId?: boolean
    startup?: boolean | StartupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["capsuleProposal"]>

  export type CapsuleProposalSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    problemStatement?: boolean
    targetMarket?: boolean
    solutionDescription?: boolean
    objectives?: boolean
    scope?: boolean
    methodology?: boolean
    startupId?: boolean
  }

  export type CapsuleProposalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "problemStatement" | "targetMarket" | "solutionDescription" | "objectives" | "scope" | "methodology" | "startupId", ExtArgs["result"]["capsuleProposal"]>
  export type CapsuleProposalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    startup?: boolean | StartupDefaultArgs<ExtArgs>
  }
  export type CapsuleProposalIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    startup?: boolean | StartupDefaultArgs<ExtArgs>
  }
  export type CapsuleProposalIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    startup?: boolean | StartupDefaultArgs<ExtArgs>
  }

  export type $CapsuleProposalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CapsuleProposal"
    objects: {
      startup: Prisma.$StartupPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      description: string
      problemStatement: string
      targetMarket: string
      solutionDescription: string
      objectives: string
      scope: string
      methodology: string
      startupId: number
    }, ExtArgs["result"]["capsuleProposal"]>
    composites: {}
  }

  type CapsuleProposalGetPayload<S extends boolean | null | undefined | CapsuleProposalDefaultArgs> = $Result.GetResult<Prisma.$CapsuleProposalPayload, S>

  type CapsuleProposalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CapsuleProposalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CapsuleProposalCountAggregateInputType | true
    }

  export interface CapsuleProposalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CapsuleProposal'], meta: { name: 'CapsuleProposal' } }
    /**
     * Find zero or one CapsuleProposal that matches the filter.
     * @param {CapsuleProposalFindUniqueArgs} args - Arguments to find a CapsuleProposal
     * @example
     * // Get one CapsuleProposal
     * const capsuleProposal = await prisma.capsuleProposal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CapsuleProposalFindUniqueArgs>(args: SelectSubset<T, CapsuleProposalFindUniqueArgs<ExtArgs>>): Prisma__CapsuleProposalClient<$Result.GetResult<Prisma.$CapsuleProposalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CapsuleProposal that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CapsuleProposalFindUniqueOrThrowArgs} args - Arguments to find a CapsuleProposal
     * @example
     * // Get one CapsuleProposal
     * const capsuleProposal = await prisma.capsuleProposal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CapsuleProposalFindUniqueOrThrowArgs>(args: SelectSubset<T, CapsuleProposalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CapsuleProposalClient<$Result.GetResult<Prisma.$CapsuleProposalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CapsuleProposal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CapsuleProposalFindFirstArgs} args - Arguments to find a CapsuleProposal
     * @example
     * // Get one CapsuleProposal
     * const capsuleProposal = await prisma.capsuleProposal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CapsuleProposalFindFirstArgs>(args?: SelectSubset<T, CapsuleProposalFindFirstArgs<ExtArgs>>): Prisma__CapsuleProposalClient<$Result.GetResult<Prisma.$CapsuleProposalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CapsuleProposal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CapsuleProposalFindFirstOrThrowArgs} args - Arguments to find a CapsuleProposal
     * @example
     * // Get one CapsuleProposal
     * const capsuleProposal = await prisma.capsuleProposal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CapsuleProposalFindFirstOrThrowArgs>(args?: SelectSubset<T, CapsuleProposalFindFirstOrThrowArgs<ExtArgs>>): Prisma__CapsuleProposalClient<$Result.GetResult<Prisma.$CapsuleProposalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CapsuleProposals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CapsuleProposalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CapsuleProposals
     * const capsuleProposals = await prisma.capsuleProposal.findMany()
     * 
     * // Get first 10 CapsuleProposals
     * const capsuleProposals = await prisma.capsuleProposal.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const capsuleProposalWithIdOnly = await prisma.capsuleProposal.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CapsuleProposalFindManyArgs>(args?: SelectSubset<T, CapsuleProposalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CapsuleProposalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CapsuleProposal.
     * @param {CapsuleProposalCreateArgs} args - Arguments to create a CapsuleProposal.
     * @example
     * // Create one CapsuleProposal
     * const CapsuleProposal = await prisma.capsuleProposal.create({
     *   data: {
     *     // ... data to create a CapsuleProposal
     *   }
     * })
     * 
     */
    create<T extends CapsuleProposalCreateArgs>(args: SelectSubset<T, CapsuleProposalCreateArgs<ExtArgs>>): Prisma__CapsuleProposalClient<$Result.GetResult<Prisma.$CapsuleProposalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CapsuleProposals.
     * @param {CapsuleProposalCreateManyArgs} args - Arguments to create many CapsuleProposals.
     * @example
     * // Create many CapsuleProposals
     * const capsuleProposal = await prisma.capsuleProposal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CapsuleProposalCreateManyArgs>(args?: SelectSubset<T, CapsuleProposalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CapsuleProposals and returns the data saved in the database.
     * @param {CapsuleProposalCreateManyAndReturnArgs} args - Arguments to create many CapsuleProposals.
     * @example
     * // Create many CapsuleProposals
     * const capsuleProposal = await prisma.capsuleProposal.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CapsuleProposals and only return the `id`
     * const capsuleProposalWithIdOnly = await prisma.capsuleProposal.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CapsuleProposalCreateManyAndReturnArgs>(args?: SelectSubset<T, CapsuleProposalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CapsuleProposalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CapsuleProposal.
     * @param {CapsuleProposalDeleteArgs} args - Arguments to delete one CapsuleProposal.
     * @example
     * // Delete one CapsuleProposal
     * const CapsuleProposal = await prisma.capsuleProposal.delete({
     *   where: {
     *     // ... filter to delete one CapsuleProposal
     *   }
     * })
     * 
     */
    delete<T extends CapsuleProposalDeleteArgs>(args: SelectSubset<T, CapsuleProposalDeleteArgs<ExtArgs>>): Prisma__CapsuleProposalClient<$Result.GetResult<Prisma.$CapsuleProposalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CapsuleProposal.
     * @param {CapsuleProposalUpdateArgs} args - Arguments to update one CapsuleProposal.
     * @example
     * // Update one CapsuleProposal
     * const capsuleProposal = await prisma.capsuleProposal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CapsuleProposalUpdateArgs>(args: SelectSubset<T, CapsuleProposalUpdateArgs<ExtArgs>>): Prisma__CapsuleProposalClient<$Result.GetResult<Prisma.$CapsuleProposalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CapsuleProposals.
     * @param {CapsuleProposalDeleteManyArgs} args - Arguments to filter CapsuleProposals to delete.
     * @example
     * // Delete a few CapsuleProposals
     * const { count } = await prisma.capsuleProposal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CapsuleProposalDeleteManyArgs>(args?: SelectSubset<T, CapsuleProposalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CapsuleProposals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CapsuleProposalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CapsuleProposals
     * const capsuleProposal = await prisma.capsuleProposal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CapsuleProposalUpdateManyArgs>(args: SelectSubset<T, CapsuleProposalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CapsuleProposals and returns the data updated in the database.
     * @param {CapsuleProposalUpdateManyAndReturnArgs} args - Arguments to update many CapsuleProposals.
     * @example
     * // Update many CapsuleProposals
     * const capsuleProposal = await prisma.capsuleProposal.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CapsuleProposals and only return the `id`
     * const capsuleProposalWithIdOnly = await prisma.capsuleProposal.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CapsuleProposalUpdateManyAndReturnArgs>(args: SelectSubset<T, CapsuleProposalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CapsuleProposalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CapsuleProposal.
     * @param {CapsuleProposalUpsertArgs} args - Arguments to update or create a CapsuleProposal.
     * @example
     * // Update or create a CapsuleProposal
     * const capsuleProposal = await prisma.capsuleProposal.upsert({
     *   create: {
     *     // ... data to create a CapsuleProposal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CapsuleProposal we want to update
     *   }
     * })
     */
    upsert<T extends CapsuleProposalUpsertArgs>(args: SelectSubset<T, CapsuleProposalUpsertArgs<ExtArgs>>): Prisma__CapsuleProposalClient<$Result.GetResult<Prisma.$CapsuleProposalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CapsuleProposals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CapsuleProposalCountArgs} args - Arguments to filter CapsuleProposals to count.
     * @example
     * // Count the number of CapsuleProposals
     * const count = await prisma.capsuleProposal.count({
     *   where: {
     *     // ... the filter for the CapsuleProposals we want to count
     *   }
     * })
    **/
    count<T extends CapsuleProposalCountArgs>(
      args?: Subset<T, CapsuleProposalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CapsuleProposalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CapsuleProposal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CapsuleProposalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CapsuleProposalAggregateArgs>(args: Subset<T, CapsuleProposalAggregateArgs>): Prisma.PrismaPromise<GetCapsuleProposalAggregateType<T>>

    /**
     * Group by CapsuleProposal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CapsuleProposalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CapsuleProposalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CapsuleProposalGroupByArgs['orderBy'] }
        : { orderBy?: CapsuleProposalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CapsuleProposalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCapsuleProposalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CapsuleProposal model
   */
  readonly fields: CapsuleProposalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CapsuleProposal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CapsuleProposalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    startup<T extends StartupDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StartupDefaultArgs<ExtArgs>>): Prisma__StartupClient<$Result.GetResult<Prisma.$StartupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CapsuleProposal model
   */
  interface CapsuleProposalFieldRefs {
    readonly id: FieldRef<"CapsuleProposal", 'Int'>
    readonly title: FieldRef<"CapsuleProposal", 'String'>
    readonly description: FieldRef<"CapsuleProposal", 'String'>
    readonly problemStatement: FieldRef<"CapsuleProposal", 'String'>
    readonly targetMarket: FieldRef<"CapsuleProposal", 'String'>
    readonly solutionDescription: FieldRef<"CapsuleProposal", 'String'>
    readonly objectives: FieldRef<"CapsuleProposal", 'String'>
    readonly scope: FieldRef<"CapsuleProposal", 'String'>
    readonly methodology: FieldRef<"CapsuleProposal", 'String'>
    readonly startupId: FieldRef<"CapsuleProposal", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * CapsuleProposal findUnique
   */
  export type CapsuleProposalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CapsuleProposal
     */
    select?: CapsuleProposalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CapsuleProposal
     */
    omit?: CapsuleProposalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CapsuleProposalInclude<ExtArgs> | null
    /**
     * Filter, which CapsuleProposal to fetch.
     */
    where: CapsuleProposalWhereUniqueInput
  }

  /**
   * CapsuleProposal findUniqueOrThrow
   */
  export type CapsuleProposalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CapsuleProposal
     */
    select?: CapsuleProposalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CapsuleProposal
     */
    omit?: CapsuleProposalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CapsuleProposalInclude<ExtArgs> | null
    /**
     * Filter, which CapsuleProposal to fetch.
     */
    where: CapsuleProposalWhereUniqueInput
  }

  /**
   * CapsuleProposal findFirst
   */
  export type CapsuleProposalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CapsuleProposal
     */
    select?: CapsuleProposalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CapsuleProposal
     */
    omit?: CapsuleProposalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CapsuleProposalInclude<ExtArgs> | null
    /**
     * Filter, which CapsuleProposal to fetch.
     */
    where?: CapsuleProposalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CapsuleProposals to fetch.
     */
    orderBy?: CapsuleProposalOrderByWithRelationInput | CapsuleProposalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CapsuleProposals.
     */
    cursor?: CapsuleProposalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CapsuleProposals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CapsuleProposals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CapsuleProposals.
     */
    distinct?: CapsuleProposalScalarFieldEnum | CapsuleProposalScalarFieldEnum[]
  }

  /**
   * CapsuleProposal findFirstOrThrow
   */
  export type CapsuleProposalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CapsuleProposal
     */
    select?: CapsuleProposalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CapsuleProposal
     */
    omit?: CapsuleProposalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CapsuleProposalInclude<ExtArgs> | null
    /**
     * Filter, which CapsuleProposal to fetch.
     */
    where?: CapsuleProposalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CapsuleProposals to fetch.
     */
    orderBy?: CapsuleProposalOrderByWithRelationInput | CapsuleProposalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CapsuleProposals.
     */
    cursor?: CapsuleProposalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CapsuleProposals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CapsuleProposals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CapsuleProposals.
     */
    distinct?: CapsuleProposalScalarFieldEnum | CapsuleProposalScalarFieldEnum[]
  }

  /**
   * CapsuleProposal findMany
   */
  export type CapsuleProposalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CapsuleProposal
     */
    select?: CapsuleProposalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CapsuleProposal
     */
    omit?: CapsuleProposalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CapsuleProposalInclude<ExtArgs> | null
    /**
     * Filter, which CapsuleProposals to fetch.
     */
    where?: CapsuleProposalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CapsuleProposals to fetch.
     */
    orderBy?: CapsuleProposalOrderByWithRelationInput | CapsuleProposalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CapsuleProposals.
     */
    cursor?: CapsuleProposalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CapsuleProposals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CapsuleProposals.
     */
    skip?: number
    distinct?: CapsuleProposalScalarFieldEnum | CapsuleProposalScalarFieldEnum[]
  }

  /**
   * CapsuleProposal create
   */
  export type CapsuleProposalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CapsuleProposal
     */
    select?: CapsuleProposalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CapsuleProposal
     */
    omit?: CapsuleProposalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CapsuleProposalInclude<ExtArgs> | null
    /**
     * The data needed to create a CapsuleProposal.
     */
    data: XOR<CapsuleProposalCreateInput, CapsuleProposalUncheckedCreateInput>
  }

  /**
   * CapsuleProposal createMany
   */
  export type CapsuleProposalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CapsuleProposals.
     */
    data: CapsuleProposalCreateManyInput | CapsuleProposalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CapsuleProposal createManyAndReturn
   */
  export type CapsuleProposalCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CapsuleProposal
     */
    select?: CapsuleProposalSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CapsuleProposal
     */
    omit?: CapsuleProposalOmit<ExtArgs> | null
    /**
     * The data used to create many CapsuleProposals.
     */
    data: CapsuleProposalCreateManyInput | CapsuleProposalCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CapsuleProposalIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CapsuleProposal update
   */
  export type CapsuleProposalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CapsuleProposal
     */
    select?: CapsuleProposalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CapsuleProposal
     */
    omit?: CapsuleProposalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CapsuleProposalInclude<ExtArgs> | null
    /**
     * The data needed to update a CapsuleProposal.
     */
    data: XOR<CapsuleProposalUpdateInput, CapsuleProposalUncheckedUpdateInput>
    /**
     * Choose, which CapsuleProposal to update.
     */
    where: CapsuleProposalWhereUniqueInput
  }

  /**
   * CapsuleProposal updateMany
   */
  export type CapsuleProposalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CapsuleProposals.
     */
    data: XOR<CapsuleProposalUpdateManyMutationInput, CapsuleProposalUncheckedUpdateManyInput>
    /**
     * Filter which CapsuleProposals to update
     */
    where?: CapsuleProposalWhereInput
    /**
     * Limit how many CapsuleProposals to update.
     */
    limit?: number
  }

  /**
   * CapsuleProposal updateManyAndReturn
   */
  export type CapsuleProposalUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CapsuleProposal
     */
    select?: CapsuleProposalSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CapsuleProposal
     */
    omit?: CapsuleProposalOmit<ExtArgs> | null
    /**
     * The data used to update CapsuleProposals.
     */
    data: XOR<CapsuleProposalUpdateManyMutationInput, CapsuleProposalUncheckedUpdateManyInput>
    /**
     * Filter which CapsuleProposals to update
     */
    where?: CapsuleProposalWhereInput
    /**
     * Limit how many CapsuleProposals to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CapsuleProposalIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CapsuleProposal upsert
   */
  export type CapsuleProposalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CapsuleProposal
     */
    select?: CapsuleProposalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CapsuleProposal
     */
    omit?: CapsuleProposalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CapsuleProposalInclude<ExtArgs> | null
    /**
     * The filter to search for the CapsuleProposal to update in case it exists.
     */
    where: CapsuleProposalWhereUniqueInput
    /**
     * In case the CapsuleProposal found by the `where` argument doesn't exist, create a new CapsuleProposal with this data.
     */
    create: XOR<CapsuleProposalCreateInput, CapsuleProposalUncheckedCreateInput>
    /**
     * In case the CapsuleProposal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CapsuleProposalUpdateInput, CapsuleProposalUncheckedUpdateInput>
  }

  /**
   * CapsuleProposal delete
   */
  export type CapsuleProposalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CapsuleProposal
     */
    select?: CapsuleProposalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CapsuleProposal
     */
    omit?: CapsuleProposalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CapsuleProposalInclude<ExtArgs> | null
    /**
     * Filter which CapsuleProposal to delete.
     */
    where: CapsuleProposalWhereUniqueInput
  }

  /**
   * CapsuleProposal deleteMany
   */
  export type CapsuleProposalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CapsuleProposals to delete
     */
    where?: CapsuleProposalWhereInput
    /**
     * Limit how many CapsuleProposals to delete.
     */
    limit?: number
  }

  /**
   * CapsuleProposal without action
   */
  export type CapsuleProposalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CapsuleProposal
     */
    select?: CapsuleProposalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CapsuleProposal
     */
    omit?: CapsuleProposalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CapsuleProposalInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    hash: 'hash',
    firstName: 'firstName',
    lastName: 'lastName',
    role: 'role'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const StartupScalarFieldEnum: {
    id: 'id',
    name: 'name',
    userId: 'userId',
    qualificationStatus: 'qualificationStatus',
    dataPrivacy: 'dataPrivacy',
    links: 'links',
    groupName: 'groupName',
    universityName: 'universityName',
    eligibility: 'eligibility'
  };

  export type StartupScalarFieldEnum = (typeof StartupScalarFieldEnum)[keyof typeof StartupScalarFieldEnum]


  export const CapsuleProposalScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    problemStatement: 'problemStatement',
    targetMarket: 'targetMarket',
    solutionDescription: 'solutionDescription',
    objectives: 'objectives',
    scope: 'scope',
    methodology: 'methodology',
    startupId: 'startupId'
  };

  export type CapsuleProposalScalarFieldEnum = (typeof CapsuleProposalScalarFieldEnum)[keyof typeof CapsuleProposalScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    hash?: StringFilter<"User"> | string
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    startups?: StartupListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    hash?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    role?: SortOrder
    startups?: StartupOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    hash?: StringFilter<"User"> | string
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    startups?: StartupListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    hash?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    role?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    hash?: StringWithAggregatesFilter<"User"> | string
    firstName?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastName?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
  }

  export type StartupWhereInput = {
    AND?: StartupWhereInput | StartupWhereInput[]
    OR?: StartupWhereInput[]
    NOT?: StartupWhereInput | StartupWhereInput[]
    id?: IntFilter<"Startup"> | number
    name?: StringFilter<"Startup"> | string
    userId?: IntFilter<"Startup"> | number
    qualificationStatus?: IntFilter<"Startup"> | number
    dataPrivacy?: BoolFilter<"Startup"> | boolean
    links?: StringNullableFilter<"Startup"> | string | null
    groupName?: StringNullableFilter<"Startup"> | string | null
    universityName?: StringNullableFilter<"Startup"> | string | null
    eligibility?: BoolFilter<"Startup"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    capsuleProposal?: XOR<CapsuleProposalNullableScalarRelationFilter, CapsuleProposalWhereInput> | null
  }

  export type StartupOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
    qualificationStatus?: SortOrder
    dataPrivacy?: SortOrder
    links?: SortOrderInput | SortOrder
    groupName?: SortOrderInput | SortOrder
    universityName?: SortOrderInput | SortOrder
    eligibility?: SortOrder
    user?: UserOrderByWithRelationInput
    capsuleProposal?: CapsuleProposalOrderByWithRelationInput
  }

  export type StartupWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: StartupWhereInput | StartupWhereInput[]
    OR?: StartupWhereInput[]
    NOT?: StartupWhereInput | StartupWhereInput[]
    name?: StringFilter<"Startup"> | string
    userId?: IntFilter<"Startup"> | number
    qualificationStatus?: IntFilter<"Startup"> | number
    dataPrivacy?: BoolFilter<"Startup"> | boolean
    links?: StringNullableFilter<"Startup"> | string | null
    groupName?: StringNullableFilter<"Startup"> | string | null
    universityName?: StringNullableFilter<"Startup"> | string | null
    eligibility?: BoolFilter<"Startup"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    capsuleProposal?: XOR<CapsuleProposalNullableScalarRelationFilter, CapsuleProposalWhereInput> | null
  }, "id">

  export type StartupOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
    qualificationStatus?: SortOrder
    dataPrivacy?: SortOrder
    links?: SortOrderInput | SortOrder
    groupName?: SortOrderInput | SortOrder
    universityName?: SortOrderInput | SortOrder
    eligibility?: SortOrder
    _count?: StartupCountOrderByAggregateInput
    _avg?: StartupAvgOrderByAggregateInput
    _max?: StartupMaxOrderByAggregateInput
    _min?: StartupMinOrderByAggregateInput
    _sum?: StartupSumOrderByAggregateInput
  }

  export type StartupScalarWhereWithAggregatesInput = {
    AND?: StartupScalarWhereWithAggregatesInput | StartupScalarWhereWithAggregatesInput[]
    OR?: StartupScalarWhereWithAggregatesInput[]
    NOT?: StartupScalarWhereWithAggregatesInput | StartupScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Startup"> | number
    name?: StringWithAggregatesFilter<"Startup"> | string
    userId?: IntWithAggregatesFilter<"Startup"> | number
    qualificationStatus?: IntWithAggregatesFilter<"Startup"> | number
    dataPrivacy?: BoolWithAggregatesFilter<"Startup"> | boolean
    links?: StringNullableWithAggregatesFilter<"Startup"> | string | null
    groupName?: StringNullableWithAggregatesFilter<"Startup"> | string | null
    universityName?: StringNullableWithAggregatesFilter<"Startup"> | string | null
    eligibility?: BoolWithAggregatesFilter<"Startup"> | boolean
  }

  export type CapsuleProposalWhereInput = {
    AND?: CapsuleProposalWhereInput | CapsuleProposalWhereInput[]
    OR?: CapsuleProposalWhereInput[]
    NOT?: CapsuleProposalWhereInput | CapsuleProposalWhereInput[]
    id?: IntFilter<"CapsuleProposal"> | number
    title?: StringFilter<"CapsuleProposal"> | string
    description?: StringFilter<"CapsuleProposal"> | string
    problemStatement?: StringFilter<"CapsuleProposal"> | string
    targetMarket?: StringFilter<"CapsuleProposal"> | string
    solutionDescription?: StringFilter<"CapsuleProposal"> | string
    objectives?: StringFilter<"CapsuleProposal"> | string
    scope?: StringFilter<"CapsuleProposal"> | string
    methodology?: StringFilter<"CapsuleProposal"> | string
    startupId?: IntFilter<"CapsuleProposal"> | number
    startup?: XOR<StartupScalarRelationFilter, StartupWhereInput>
  }

  export type CapsuleProposalOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    problemStatement?: SortOrder
    targetMarket?: SortOrder
    solutionDescription?: SortOrder
    objectives?: SortOrder
    scope?: SortOrder
    methodology?: SortOrder
    startupId?: SortOrder
    startup?: StartupOrderByWithRelationInput
  }

  export type CapsuleProposalWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    startupId?: number
    AND?: CapsuleProposalWhereInput | CapsuleProposalWhereInput[]
    OR?: CapsuleProposalWhereInput[]
    NOT?: CapsuleProposalWhereInput | CapsuleProposalWhereInput[]
    title?: StringFilter<"CapsuleProposal"> | string
    description?: StringFilter<"CapsuleProposal"> | string
    problemStatement?: StringFilter<"CapsuleProposal"> | string
    targetMarket?: StringFilter<"CapsuleProposal"> | string
    solutionDescription?: StringFilter<"CapsuleProposal"> | string
    objectives?: StringFilter<"CapsuleProposal"> | string
    scope?: StringFilter<"CapsuleProposal"> | string
    methodology?: StringFilter<"CapsuleProposal"> | string
    startup?: XOR<StartupScalarRelationFilter, StartupWhereInput>
  }, "id" | "startupId">

  export type CapsuleProposalOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    problemStatement?: SortOrder
    targetMarket?: SortOrder
    solutionDescription?: SortOrder
    objectives?: SortOrder
    scope?: SortOrder
    methodology?: SortOrder
    startupId?: SortOrder
    _count?: CapsuleProposalCountOrderByAggregateInput
    _avg?: CapsuleProposalAvgOrderByAggregateInput
    _max?: CapsuleProposalMaxOrderByAggregateInput
    _min?: CapsuleProposalMinOrderByAggregateInput
    _sum?: CapsuleProposalSumOrderByAggregateInput
  }

  export type CapsuleProposalScalarWhereWithAggregatesInput = {
    AND?: CapsuleProposalScalarWhereWithAggregatesInput | CapsuleProposalScalarWhereWithAggregatesInput[]
    OR?: CapsuleProposalScalarWhereWithAggregatesInput[]
    NOT?: CapsuleProposalScalarWhereWithAggregatesInput | CapsuleProposalScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CapsuleProposal"> | number
    title?: StringWithAggregatesFilter<"CapsuleProposal"> | string
    description?: StringWithAggregatesFilter<"CapsuleProposal"> | string
    problemStatement?: StringWithAggregatesFilter<"CapsuleProposal"> | string
    targetMarket?: StringWithAggregatesFilter<"CapsuleProposal"> | string
    solutionDescription?: StringWithAggregatesFilter<"CapsuleProposal"> | string
    objectives?: StringWithAggregatesFilter<"CapsuleProposal"> | string
    scope?: StringWithAggregatesFilter<"CapsuleProposal"> | string
    methodology?: StringWithAggregatesFilter<"CapsuleProposal"> | string
    startupId?: IntWithAggregatesFilter<"CapsuleProposal"> | number
  }

  export type UserCreateInput = {
    email: string
    hash: string
    firstName?: string | null
    lastName?: string | null
    role?: $Enums.Role
    startups?: StartupCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    hash: string
    firstName?: string | null
    lastName?: string | null
    role?: $Enums.Role
    startups?: StartupUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    startups?: StartupUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    startups?: StartupUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    hash: string
    firstName?: string | null
    lastName?: string | null
    role?: $Enums.Role
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
  }

  export type StartupCreateInput = {
    name: string
    qualificationStatus?: number
    dataPrivacy?: boolean
    links?: string | null
    groupName?: string | null
    universityName?: string | null
    eligibility?: boolean
    user: UserCreateNestedOneWithoutStartupsInput
    capsuleProposal?: CapsuleProposalCreateNestedOneWithoutStartupInput
  }

  export type StartupUncheckedCreateInput = {
    id?: number
    name: string
    userId: number
    qualificationStatus?: number
    dataPrivacy?: boolean
    links?: string | null
    groupName?: string | null
    universityName?: string | null
    eligibility?: boolean
    capsuleProposal?: CapsuleProposalUncheckedCreateNestedOneWithoutStartupInput
  }

  export type StartupUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    qualificationStatus?: IntFieldUpdateOperationsInput | number
    dataPrivacy?: BoolFieldUpdateOperationsInput | boolean
    links?: NullableStringFieldUpdateOperationsInput | string | null
    groupName?: NullableStringFieldUpdateOperationsInput | string | null
    universityName?: NullableStringFieldUpdateOperationsInput | string | null
    eligibility?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutStartupsNestedInput
    capsuleProposal?: CapsuleProposalUpdateOneWithoutStartupNestedInput
  }

  export type StartupUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    qualificationStatus?: IntFieldUpdateOperationsInput | number
    dataPrivacy?: BoolFieldUpdateOperationsInput | boolean
    links?: NullableStringFieldUpdateOperationsInput | string | null
    groupName?: NullableStringFieldUpdateOperationsInput | string | null
    universityName?: NullableStringFieldUpdateOperationsInput | string | null
    eligibility?: BoolFieldUpdateOperationsInput | boolean
    capsuleProposal?: CapsuleProposalUncheckedUpdateOneWithoutStartupNestedInput
  }

  export type StartupCreateManyInput = {
    id?: number
    name: string
    userId: number
    qualificationStatus?: number
    dataPrivacy?: boolean
    links?: string | null
    groupName?: string | null
    universityName?: string | null
    eligibility?: boolean
  }

  export type StartupUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    qualificationStatus?: IntFieldUpdateOperationsInput | number
    dataPrivacy?: BoolFieldUpdateOperationsInput | boolean
    links?: NullableStringFieldUpdateOperationsInput | string | null
    groupName?: NullableStringFieldUpdateOperationsInput | string | null
    universityName?: NullableStringFieldUpdateOperationsInput | string | null
    eligibility?: BoolFieldUpdateOperationsInput | boolean
  }

  export type StartupUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    qualificationStatus?: IntFieldUpdateOperationsInput | number
    dataPrivacy?: BoolFieldUpdateOperationsInput | boolean
    links?: NullableStringFieldUpdateOperationsInput | string | null
    groupName?: NullableStringFieldUpdateOperationsInput | string | null
    universityName?: NullableStringFieldUpdateOperationsInput | string | null
    eligibility?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CapsuleProposalCreateInput = {
    title: string
    description: string
    problemStatement: string
    targetMarket: string
    solutionDescription: string
    objectives: string
    scope: string
    methodology: string
    startup: StartupCreateNestedOneWithoutCapsuleProposalInput
  }

  export type CapsuleProposalUncheckedCreateInput = {
    id?: number
    title: string
    description: string
    problemStatement: string
    targetMarket: string
    solutionDescription: string
    objectives: string
    scope: string
    methodology: string
    startupId: number
  }

  export type CapsuleProposalUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    problemStatement?: StringFieldUpdateOperationsInput | string
    targetMarket?: StringFieldUpdateOperationsInput | string
    solutionDescription?: StringFieldUpdateOperationsInput | string
    objectives?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    methodology?: StringFieldUpdateOperationsInput | string
    startup?: StartupUpdateOneRequiredWithoutCapsuleProposalNestedInput
  }

  export type CapsuleProposalUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    problemStatement?: StringFieldUpdateOperationsInput | string
    targetMarket?: StringFieldUpdateOperationsInput | string
    solutionDescription?: StringFieldUpdateOperationsInput | string
    objectives?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    methodology?: StringFieldUpdateOperationsInput | string
    startupId?: IntFieldUpdateOperationsInput | number
  }

  export type CapsuleProposalCreateManyInput = {
    id?: number
    title: string
    description: string
    problemStatement: string
    targetMarket: string
    solutionDescription: string
    objectives: string
    scope: string
    methodology: string
    startupId: number
  }

  export type CapsuleProposalUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    problemStatement?: StringFieldUpdateOperationsInput | string
    targetMarket?: StringFieldUpdateOperationsInput | string
    solutionDescription?: StringFieldUpdateOperationsInput | string
    objectives?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    methodology?: StringFieldUpdateOperationsInput | string
  }

  export type CapsuleProposalUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    problemStatement?: StringFieldUpdateOperationsInput | string
    targetMarket?: StringFieldUpdateOperationsInput | string
    solutionDescription?: StringFieldUpdateOperationsInput | string
    objectives?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    methodology?: StringFieldUpdateOperationsInput | string
    startupId?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type StartupListRelationFilter = {
    every?: StartupWhereInput
    some?: StartupWhereInput
    none?: StartupWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type StartupOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    hash?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    role?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    hash?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    role?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    hash?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    role?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type CapsuleProposalNullableScalarRelationFilter = {
    is?: CapsuleProposalWhereInput | null
    isNot?: CapsuleProposalWhereInput | null
  }

  export type StartupCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
    qualificationStatus?: SortOrder
    dataPrivacy?: SortOrder
    links?: SortOrder
    groupName?: SortOrder
    universityName?: SortOrder
    eligibility?: SortOrder
  }

  export type StartupAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    qualificationStatus?: SortOrder
  }

  export type StartupMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
    qualificationStatus?: SortOrder
    dataPrivacy?: SortOrder
    links?: SortOrder
    groupName?: SortOrder
    universityName?: SortOrder
    eligibility?: SortOrder
  }

  export type StartupMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
    qualificationStatus?: SortOrder
    dataPrivacy?: SortOrder
    links?: SortOrder
    groupName?: SortOrder
    universityName?: SortOrder
    eligibility?: SortOrder
  }

  export type StartupSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    qualificationStatus?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StartupScalarRelationFilter = {
    is?: StartupWhereInput
    isNot?: StartupWhereInput
  }

  export type CapsuleProposalCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    problemStatement?: SortOrder
    targetMarket?: SortOrder
    solutionDescription?: SortOrder
    objectives?: SortOrder
    scope?: SortOrder
    methodology?: SortOrder
    startupId?: SortOrder
  }

  export type CapsuleProposalAvgOrderByAggregateInput = {
    id?: SortOrder
    startupId?: SortOrder
  }

  export type CapsuleProposalMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    problemStatement?: SortOrder
    targetMarket?: SortOrder
    solutionDescription?: SortOrder
    objectives?: SortOrder
    scope?: SortOrder
    methodology?: SortOrder
    startupId?: SortOrder
  }

  export type CapsuleProposalMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    problemStatement?: SortOrder
    targetMarket?: SortOrder
    solutionDescription?: SortOrder
    objectives?: SortOrder
    scope?: SortOrder
    methodology?: SortOrder
    startupId?: SortOrder
  }

  export type CapsuleProposalSumOrderByAggregateInput = {
    id?: SortOrder
    startupId?: SortOrder
  }

  export type StartupCreateNestedManyWithoutUserInput = {
    create?: XOR<StartupCreateWithoutUserInput, StartupUncheckedCreateWithoutUserInput> | StartupCreateWithoutUserInput[] | StartupUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StartupCreateOrConnectWithoutUserInput | StartupCreateOrConnectWithoutUserInput[]
    createMany?: StartupCreateManyUserInputEnvelope
    connect?: StartupWhereUniqueInput | StartupWhereUniqueInput[]
  }

  export type StartupUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<StartupCreateWithoutUserInput, StartupUncheckedCreateWithoutUserInput> | StartupCreateWithoutUserInput[] | StartupUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StartupCreateOrConnectWithoutUserInput | StartupCreateOrConnectWithoutUserInput[]
    createMany?: StartupCreateManyUserInputEnvelope
    connect?: StartupWhereUniqueInput | StartupWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type StartupUpdateManyWithoutUserNestedInput = {
    create?: XOR<StartupCreateWithoutUserInput, StartupUncheckedCreateWithoutUserInput> | StartupCreateWithoutUserInput[] | StartupUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StartupCreateOrConnectWithoutUserInput | StartupCreateOrConnectWithoutUserInput[]
    upsert?: StartupUpsertWithWhereUniqueWithoutUserInput | StartupUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: StartupCreateManyUserInputEnvelope
    set?: StartupWhereUniqueInput | StartupWhereUniqueInput[]
    disconnect?: StartupWhereUniqueInput | StartupWhereUniqueInput[]
    delete?: StartupWhereUniqueInput | StartupWhereUniqueInput[]
    connect?: StartupWhereUniqueInput | StartupWhereUniqueInput[]
    update?: StartupUpdateWithWhereUniqueWithoutUserInput | StartupUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: StartupUpdateManyWithWhereWithoutUserInput | StartupUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: StartupScalarWhereInput | StartupScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StartupUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<StartupCreateWithoutUserInput, StartupUncheckedCreateWithoutUserInput> | StartupCreateWithoutUserInput[] | StartupUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StartupCreateOrConnectWithoutUserInput | StartupCreateOrConnectWithoutUserInput[]
    upsert?: StartupUpsertWithWhereUniqueWithoutUserInput | StartupUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: StartupCreateManyUserInputEnvelope
    set?: StartupWhereUniqueInput | StartupWhereUniqueInput[]
    disconnect?: StartupWhereUniqueInput | StartupWhereUniqueInput[]
    delete?: StartupWhereUniqueInput | StartupWhereUniqueInput[]
    connect?: StartupWhereUniqueInput | StartupWhereUniqueInput[]
    update?: StartupUpdateWithWhereUniqueWithoutUserInput | StartupUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: StartupUpdateManyWithWhereWithoutUserInput | StartupUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: StartupScalarWhereInput | StartupScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutStartupsInput = {
    create?: XOR<UserCreateWithoutStartupsInput, UserUncheckedCreateWithoutStartupsInput>
    connectOrCreate?: UserCreateOrConnectWithoutStartupsInput
    connect?: UserWhereUniqueInput
  }

  export type CapsuleProposalCreateNestedOneWithoutStartupInput = {
    create?: XOR<CapsuleProposalCreateWithoutStartupInput, CapsuleProposalUncheckedCreateWithoutStartupInput>
    connectOrCreate?: CapsuleProposalCreateOrConnectWithoutStartupInput
    connect?: CapsuleProposalWhereUniqueInput
  }

  export type CapsuleProposalUncheckedCreateNestedOneWithoutStartupInput = {
    create?: XOR<CapsuleProposalCreateWithoutStartupInput, CapsuleProposalUncheckedCreateWithoutStartupInput>
    connectOrCreate?: CapsuleProposalCreateOrConnectWithoutStartupInput
    connect?: CapsuleProposalWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutStartupsNestedInput = {
    create?: XOR<UserCreateWithoutStartupsInput, UserUncheckedCreateWithoutStartupsInput>
    connectOrCreate?: UserCreateOrConnectWithoutStartupsInput
    upsert?: UserUpsertWithoutStartupsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutStartupsInput, UserUpdateWithoutStartupsInput>, UserUncheckedUpdateWithoutStartupsInput>
  }

  export type CapsuleProposalUpdateOneWithoutStartupNestedInput = {
    create?: XOR<CapsuleProposalCreateWithoutStartupInput, CapsuleProposalUncheckedCreateWithoutStartupInput>
    connectOrCreate?: CapsuleProposalCreateOrConnectWithoutStartupInput
    upsert?: CapsuleProposalUpsertWithoutStartupInput
    disconnect?: CapsuleProposalWhereInput | boolean
    delete?: CapsuleProposalWhereInput | boolean
    connect?: CapsuleProposalWhereUniqueInput
    update?: XOR<XOR<CapsuleProposalUpdateToOneWithWhereWithoutStartupInput, CapsuleProposalUpdateWithoutStartupInput>, CapsuleProposalUncheckedUpdateWithoutStartupInput>
  }

  export type CapsuleProposalUncheckedUpdateOneWithoutStartupNestedInput = {
    create?: XOR<CapsuleProposalCreateWithoutStartupInput, CapsuleProposalUncheckedCreateWithoutStartupInput>
    connectOrCreate?: CapsuleProposalCreateOrConnectWithoutStartupInput
    upsert?: CapsuleProposalUpsertWithoutStartupInput
    disconnect?: CapsuleProposalWhereInput | boolean
    delete?: CapsuleProposalWhereInput | boolean
    connect?: CapsuleProposalWhereUniqueInput
    update?: XOR<XOR<CapsuleProposalUpdateToOneWithWhereWithoutStartupInput, CapsuleProposalUpdateWithoutStartupInput>, CapsuleProposalUncheckedUpdateWithoutStartupInput>
  }

  export type StartupCreateNestedOneWithoutCapsuleProposalInput = {
    create?: XOR<StartupCreateWithoutCapsuleProposalInput, StartupUncheckedCreateWithoutCapsuleProposalInput>
    connectOrCreate?: StartupCreateOrConnectWithoutCapsuleProposalInput
    connect?: StartupWhereUniqueInput
  }

  export type StartupUpdateOneRequiredWithoutCapsuleProposalNestedInput = {
    create?: XOR<StartupCreateWithoutCapsuleProposalInput, StartupUncheckedCreateWithoutCapsuleProposalInput>
    connectOrCreate?: StartupCreateOrConnectWithoutCapsuleProposalInput
    upsert?: StartupUpsertWithoutCapsuleProposalInput
    connect?: StartupWhereUniqueInput
    update?: XOR<XOR<StartupUpdateToOneWithWhereWithoutCapsuleProposalInput, StartupUpdateWithoutCapsuleProposalInput>, StartupUncheckedUpdateWithoutCapsuleProposalInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StartupCreateWithoutUserInput = {
    name: string
    qualificationStatus?: number
    dataPrivacy?: boolean
    links?: string | null
    groupName?: string | null
    universityName?: string | null
    eligibility?: boolean
    capsuleProposal?: CapsuleProposalCreateNestedOneWithoutStartupInput
  }

  export type StartupUncheckedCreateWithoutUserInput = {
    id?: number
    name: string
    qualificationStatus?: number
    dataPrivacy?: boolean
    links?: string | null
    groupName?: string | null
    universityName?: string | null
    eligibility?: boolean
    capsuleProposal?: CapsuleProposalUncheckedCreateNestedOneWithoutStartupInput
  }

  export type StartupCreateOrConnectWithoutUserInput = {
    where: StartupWhereUniqueInput
    create: XOR<StartupCreateWithoutUserInput, StartupUncheckedCreateWithoutUserInput>
  }

  export type StartupCreateManyUserInputEnvelope = {
    data: StartupCreateManyUserInput | StartupCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type StartupUpsertWithWhereUniqueWithoutUserInput = {
    where: StartupWhereUniqueInput
    update: XOR<StartupUpdateWithoutUserInput, StartupUncheckedUpdateWithoutUserInput>
    create: XOR<StartupCreateWithoutUserInput, StartupUncheckedCreateWithoutUserInput>
  }

  export type StartupUpdateWithWhereUniqueWithoutUserInput = {
    where: StartupWhereUniqueInput
    data: XOR<StartupUpdateWithoutUserInput, StartupUncheckedUpdateWithoutUserInput>
  }

  export type StartupUpdateManyWithWhereWithoutUserInput = {
    where: StartupScalarWhereInput
    data: XOR<StartupUpdateManyMutationInput, StartupUncheckedUpdateManyWithoutUserInput>
  }

  export type StartupScalarWhereInput = {
    AND?: StartupScalarWhereInput | StartupScalarWhereInput[]
    OR?: StartupScalarWhereInput[]
    NOT?: StartupScalarWhereInput | StartupScalarWhereInput[]
    id?: IntFilter<"Startup"> | number
    name?: StringFilter<"Startup"> | string
    userId?: IntFilter<"Startup"> | number
    qualificationStatus?: IntFilter<"Startup"> | number
    dataPrivacy?: BoolFilter<"Startup"> | boolean
    links?: StringNullableFilter<"Startup"> | string | null
    groupName?: StringNullableFilter<"Startup"> | string | null
    universityName?: StringNullableFilter<"Startup"> | string | null
    eligibility?: BoolFilter<"Startup"> | boolean
  }

  export type UserCreateWithoutStartupsInput = {
    email: string
    hash: string
    firstName?: string | null
    lastName?: string | null
    role?: $Enums.Role
  }

  export type UserUncheckedCreateWithoutStartupsInput = {
    id?: number
    email: string
    hash: string
    firstName?: string | null
    lastName?: string | null
    role?: $Enums.Role
  }

  export type UserCreateOrConnectWithoutStartupsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutStartupsInput, UserUncheckedCreateWithoutStartupsInput>
  }

  export type CapsuleProposalCreateWithoutStartupInput = {
    title: string
    description: string
    problemStatement: string
    targetMarket: string
    solutionDescription: string
    objectives: string
    scope: string
    methodology: string
  }

  export type CapsuleProposalUncheckedCreateWithoutStartupInput = {
    id?: number
    title: string
    description: string
    problemStatement: string
    targetMarket: string
    solutionDescription: string
    objectives: string
    scope: string
    methodology: string
  }

  export type CapsuleProposalCreateOrConnectWithoutStartupInput = {
    where: CapsuleProposalWhereUniqueInput
    create: XOR<CapsuleProposalCreateWithoutStartupInput, CapsuleProposalUncheckedCreateWithoutStartupInput>
  }

  export type UserUpsertWithoutStartupsInput = {
    update: XOR<UserUpdateWithoutStartupsInput, UserUncheckedUpdateWithoutStartupsInput>
    create: XOR<UserCreateWithoutStartupsInput, UserUncheckedCreateWithoutStartupsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutStartupsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutStartupsInput, UserUncheckedUpdateWithoutStartupsInput>
  }

  export type UserUpdateWithoutStartupsInput = {
    email?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
  }

  export type UserUncheckedUpdateWithoutStartupsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
  }

  export type CapsuleProposalUpsertWithoutStartupInput = {
    update: XOR<CapsuleProposalUpdateWithoutStartupInput, CapsuleProposalUncheckedUpdateWithoutStartupInput>
    create: XOR<CapsuleProposalCreateWithoutStartupInput, CapsuleProposalUncheckedCreateWithoutStartupInput>
    where?: CapsuleProposalWhereInput
  }

  export type CapsuleProposalUpdateToOneWithWhereWithoutStartupInput = {
    where?: CapsuleProposalWhereInput
    data: XOR<CapsuleProposalUpdateWithoutStartupInput, CapsuleProposalUncheckedUpdateWithoutStartupInput>
  }

  export type CapsuleProposalUpdateWithoutStartupInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    problemStatement?: StringFieldUpdateOperationsInput | string
    targetMarket?: StringFieldUpdateOperationsInput | string
    solutionDescription?: StringFieldUpdateOperationsInput | string
    objectives?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    methodology?: StringFieldUpdateOperationsInput | string
  }

  export type CapsuleProposalUncheckedUpdateWithoutStartupInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    problemStatement?: StringFieldUpdateOperationsInput | string
    targetMarket?: StringFieldUpdateOperationsInput | string
    solutionDescription?: StringFieldUpdateOperationsInput | string
    objectives?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    methodology?: StringFieldUpdateOperationsInput | string
  }

  export type StartupCreateWithoutCapsuleProposalInput = {
    name: string
    qualificationStatus?: number
    dataPrivacy?: boolean
    links?: string | null
    groupName?: string | null
    universityName?: string | null
    eligibility?: boolean
    user: UserCreateNestedOneWithoutStartupsInput
  }

  export type StartupUncheckedCreateWithoutCapsuleProposalInput = {
    id?: number
    name: string
    userId: number
    qualificationStatus?: number
    dataPrivacy?: boolean
    links?: string | null
    groupName?: string | null
    universityName?: string | null
    eligibility?: boolean
  }

  export type StartupCreateOrConnectWithoutCapsuleProposalInput = {
    where: StartupWhereUniqueInput
    create: XOR<StartupCreateWithoutCapsuleProposalInput, StartupUncheckedCreateWithoutCapsuleProposalInput>
  }

  export type StartupUpsertWithoutCapsuleProposalInput = {
    update: XOR<StartupUpdateWithoutCapsuleProposalInput, StartupUncheckedUpdateWithoutCapsuleProposalInput>
    create: XOR<StartupCreateWithoutCapsuleProposalInput, StartupUncheckedCreateWithoutCapsuleProposalInput>
    where?: StartupWhereInput
  }

  export type StartupUpdateToOneWithWhereWithoutCapsuleProposalInput = {
    where?: StartupWhereInput
    data: XOR<StartupUpdateWithoutCapsuleProposalInput, StartupUncheckedUpdateWithoutCapsuleProposalInput>
  }

  export type StartupUpdateWithoutCapsuleProposalInput = {
    name?: StringFieldUpdateOperationsInput | string
    qualificationStatus?: IntFieldUpdateOperationsInput | number
    dataPrivacy?: BoolFieldUpdateOperationsInput | boolean
    links?: NullableStringFieldUpdateOperationsInput | string | null
    groupName?: NullableStringFieldUpdateOperationsInput | string | null
    universityName?: NullableStringFieldUpdateOperationsInput | string | null
    eligibility?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutStartupsNestedInput
  }

  export type StartupUncheckedUpdateWithoutCapsuleProposalInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    qualificationStatus?: IntFieldUpdateOperationsInput | number
    dataPrivacy?: BoolFieldUpdateOperationsInput | boolean
    links?: NullableStringFieldUpdateOperationsInput | string | null
    groupName?: NullableStringFieldUpdateOperationsInput | string | null
    universityName?: NullableStringFieldUpdateOperationsInput | string | null
    eligibility?: BoolFieldUpdateOperationsInput | boolean
  }

  export type StartupCreateManyUserInput = {
    id?: number
    name: string
    qualificationStatus?: number
    dataPrivacy?: boolean
    links?: string | null
    groupName?: string | null
    universityName?: string | null
    eligibility?: boolean
  }

  export type StartupUpdateWithoutUserInput = {
    name?: StringFieldUpdateOperationsInput | string
    qualificationStatus?: IntFieldUpdateOperationsInput | number
    dataPrivacy?: BoolFieldUpdateOperationsInput | boolean
    links?: NullableStringFieldUpdateOperationsInput | string | null
    groupName?: NullableStringFieldUpdateOperationsInput | string | null
    universityName?: NullableStringFieldUpdateOperationsInput | string | null
    eligibility?: BoolFieldUpdateOperationsInput | boolean
    capsuleProposal?: CapsuleProposalUpdateOneWithoutStartupNestedInput
  }

  export type StartupUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    qualificationStatus?: IntFieldUpdateOperationsInput | number
    dataPrivacy?: BoolFieldUpdateOperationsInput | boolean
    links?: NullableStringFieldUpdateOperationsInput | string | null
    groupName?: NullableStringFieldUpdateOperationsInput | string | null
    universityName?: NullableStringFieldUpdateOperationsInput | string | null
    eligibility?: BoolFieldUpdateOperationsInput | boolean
    capsuleProposal?: CapsuleProposalUncheckedUpdateOneWithoutStartupNestedInput
  }

  export type StartupUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    qualificationStatus?: IntFieldUpdateOperationsInput | number
    dataPrivacy?: BoolFieldUpdateOperationsInput | boolean
    links?: NullableStringFieldUpdateOperationsInput | string | null
    groupName?: NullableStringFieldUpdateOperationsInput | string | null
    universityName?: NullableStringFieldUpdateOperationsInput | string | null
    eligibility?: BoolFieldUpdateOperationsInput | boolean
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}