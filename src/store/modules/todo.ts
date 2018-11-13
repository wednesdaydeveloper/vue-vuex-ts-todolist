import { createNamespacedHelpers } from 'vuex';
import { DefineGetters, DefineMutations, DefineActions } from 'vuex-type-helper';


export interface TodoItem {
  content: string;
  checked: boolean;
  id: number;
}

export interface State {
  items: TodoItem[];
  filter: ((item: TodoItem) => boolean) | undefined;
}

export interface Getters {
  // getterName: returnType
  items: TodoItem[];
}

export interface Mutations {
  // mutationName: mutationPayloadType
  add: {
    content: string,
  };
  toggle: {
    id: number,
  };
}

export interface Actions {
  addAsync: {
    content: string,
  };
  toggleAsync: {
    id: number,
  };
}

const getters: DefineGetters<Getters, State> = {
  items: (state) => state.items,
};

const mutations: DefineMutations<Mutations, State> = {
  add(state, payload) {
    state.items.push({ checked: false, id: offset++, ...payload });
  },
  toggle(state, payload) {
    state.items.filter((item) => item.id === payload.id).forEach((item) => item.checked = !item.checked);
  },
};

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

const actions: DefineActions<Actions, State, Mutations, Getters> = {
  addAsync({ commit }, payload) {
    return wait().then(() => commit('add', payload));
  },

  toggleAsync({ commit }, payload) {
    return wait().then(() => commit('toggle', payload));
  },
};

export const {
  mapState,
  mapGetters,
  mapMutations,
  mapActions,
} = createNamespacedHelpers<State, Getters, Mutations, Actions>('todo');

let offset: number = 0;

export const setOffset = (o: number) => offset = o;

export const todo = {
  namespaced: true,
  state: {
    items: [
      { id: offset++, checked: false, content: '項目1' },
      { id: offset++, checked: false, content: '項目2' },
      { id: offset++, checked: false, content: '項目3' },
    ],
    filter: undefined,
  },
  getters,
  mutations,
  actions,
};
