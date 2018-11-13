import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Todo from '@/components/Todo.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Todo.vue', () => {
    let actions: any;
    let store: any;

    beforeEach(() => {
        actions = {
            addAsync:       jest.fn(),
            toggleAsync:    jest.fn(),
        };

        const modules = {
            todo: {
                namespaced: true,
                getters: {
                    items: () => [
                        { id: 1001, checked: false, content: '項目1' },
                        { id: 1002, checked: true , content: '項目2' },
                        { id: 1003, checked: false, content: '項目3' },
                      ],
                },
                actions,
            },
        };

        store = new Vuex.Store({
            modules,
        });
    });

    it('renders todo list.', () => {
        const wrapper = shallowMount(Todo, { store, localVue });

        const labels = wrapper.findAll('label');
        expect(labels.length).toBe(3);
        //  content
        expect(labels.at(0).text()).toMatch('項目1');
        expect(labels.at(1).text()).toMatch('項目2');
        expect(labels.at(2).text()).toMatch('項目3');
        //  class
        expect(labels.at(0).classes()).toEqual([]);
        expect(labels.at(1).classes()).toEqual(['done']);
        expect(labels.at(2).classes()).toEqual([]);
        //  チェックボックス
        const checkboxes = wrapper.findAll('input[type="checkbox"]');
        expect(checkboxes.length).toBe(3);
        expect((checkboxes.at(0).element as HTMLInputElement).checked).toBe(false);
        expect((checkboxes.at(1).element as HTMLInputElement).checked).toBe(true);
        expect((checkboxes.at(2).element as HTMLInputElement).checked).toBe(false);

        //  Todo 入力用テキストボックス
        const text = wrapper.find('input[type="text"]');
        expect(text.text()).toBe('');
    });

    it('click items', () => {
        const wrapper = shallowMount(Todo, { store, localVue });

        const checkboxes = wrapper.findAll('input[type="checkbox"]');
        expect(checkboxes.length).toBe(3);

        //  チェックボックスをクリック
        checkboxes.at(0).trigger('change');
        checkboxes.at(1).trigger('change');
        checkboxes.at(2).trigger('change');

        expect(actions.toggleAsync).toHaveBeenCalledWith(expect.anything(), {id: 1001}, undefined);
        expect(actions.toggleAsync).toHaveBeenCalledWith(expect.anything(), {id: 1002}, undefined);
        expect(actions.toggleAsync).toHaveBeenCalledWith(expect.anything(), {id: 1003}, undefined);

        expect(actions.addAsync).toHaveBeenCalledTimes(0);
    });

    it('enter textbox without content', () => {
        const wrapper = shallowMount(Todo, { store, localVue });

        //  Todo 入力用テキストボックス
        const text = wrapper.find('input[type="text"]');
        text.setValue('');
        text.trigger('keyup.enter');

        expect(actions.addAsync).toHaveBeenCalledTimes(0);
        expect(actions.toggleAsync).toHaveBeenCalledTimes(0);
    });

    it('enter textbox with　content', () => {
        const wrapper = shallowMount(Todo, { store, localVue });

        //  Todo 入力用テキストボックス
        const text = wrapper.find('input[type="text"]');
        text.setValue('コンテンツ1234');
        text.trigger('keyup.enter');

        expect(actions.addAsync).toHaveBeenCalledWith(expect.anything(), {content: 'コンテンツ1234'}, undefined);
        expect(actions.toggleAsync).toHaveBeenCalledTimes(0);
    });
});
