import {todo, State, setOffset} from '@/store/modules/todo';

describe('counter', () => {
  describe('getters', () => {
    it('should be able to get items', () => {
      const state: State = {
        items: [
            { id: 1001, checked: false, content: '項目1' },
            { id: 1002, checked: false, content: '項目2' },
            { id: 1003, checked: false, content: '項目3' },
        ],
        filter: undefined,
      };

      const wrapper = (getters: any) => getters.items(state);

      const items = wrapper(todo.getters);

      expect(items).toEqual(state.items);
    });
  });

  describe('mutations', () => {
    let state: State;

    it('should be able to toggle.', () => {
        state = {
            items: [
                { id: 1001, checked: false, content: '項目1' },
                { id: 1002, checked: true , content: '項目2' },
                { id: 1003, checked: false, content: '項目3' },
            ],
            filter: undefined,
        };

        //  toggle を呼び出すと、checkedの値が反転する
        todo.mutations.toggle(state, {id: 1001});
        todo.mutations.toggle(state, {id: 1002});
        todo.mutations.toggle(state, {id: 1003});

        expect(state.items[0].checked).toBe(true);
        expect(state.items[1].checked).toBe(false);
        expect(state.items[2].checked).toBe(true);

        //  再度toggle を呼び出してみる。元に戻る。
        todo.mutations.toggle(state, {id: 1001});
        todo.mutations.toggle(state, {id: 1002});
        todo.mutations.toggle(state, {id: 1003});

        expect(state.items[0].checked).toBe(false);
        expect(state.items[1].checked).toBe(true);
        expect(state.items[2].checked).toBe(false);

        //  存在しないIDを指定しても別に落ちないし変化もしない
        todo.mutations.toggle(state, {id: 9999});
        expect(state.items[0].checked).toBe(false);
        expect(state.items[1].checked).toBe(true);
        expect(state.items[2].checked).toBe(false);
    });

    it('should be able to toggle. items is empty.', () => {
        state = {
            items: [],
            filter: undefined,
        };

        //  toggle を呼び出す
        todo.mutations.toggle(state, {id: 1001});
        todo.mutations.toggle(state, {id: 1002});
        todo.mutations.toggle(state, {id: 1003});
        todo.mutations.toggle(state, {id: 9999});
        expect(state.items.length).toBe(0);
    });

    it('should be able to add content.', () => {
        state = {
            items: [
                { id: 1001, checked: false, content: '項目1' },
                { id: 1002, checked: true , content: '項目2' },
                { id: 1003, checked: false, content: '項目3' },
            ],
            filter: undefined,
        };
        setOffset(1004);

        todo.mutations.add(state, {content: '項目4'});
        expect(state.items).toEqual([
            { id: 1001, checked: false, content: '項目1' },
            { id: 1002, checked: true , content: '項目2' },
            { id: 1003, checked: false, content: '項目3' },
            { id: 1004, checked: false, content: '項目4' },
        ]);
    });

    it('should be able to add content. items is empty.', () => {
        state = {
            items: [],
            filter: undefined,
        };
        setOffset(1004);

        todo.mutations.add(state, {content: '項目4'});
        expect(state.items).toEqual([
            { id: 1004, checked: false, content: '項目4' },
        ]);
    });
  });

  describe('actions', () => {

    it('should be able to commit toggle', async () => {
        const commit = jest.fn();

        const wrapper = (actions: any) => actions.toggleAsync({ commit }, {id: 1001});
        await wrapper(todo.actions);

        expect(commit).toHaveBeenCalledWith('toggle', {id: 1001});
    });

    it('should be able to commit decrement', async () => {
        const commit = jest.fn();

        const wrapper = (actions: any) => actions.addAsync({ commit }, {content: '項目4'});

        await wrapper(todo.actions);

        expect(commit).toHaveBeenCalledWith('add', {content: '項目4'});
      });
  });
});
