import _Vue from 'vue';

export declare function install(Vue: typeof _Vue): void;

export interface Commit {
  (type: string, payload?: any, options?: CommitOptions): void;
  <P extends Payload>(payloadWithType: P, options?: CommitOptions): void;
}

export interface Payload {
  type: string;
}

export interface CommitOptions {
  silent?: boolean;
  root?: boolean;
}

type Getter<S, R> = (state: S, getters: any, rootState: R, rootGetters: any) => any;

export interface GetterTree<S, R> {
  [key: string]: Getter<S, R>
}
