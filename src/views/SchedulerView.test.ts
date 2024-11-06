import { mount, VueWrapper } from '@vue/test-utils';
import SchedulerView from './SchedulerView.vue';
import {describe, it, expect} from "vitest";

describe('SchedulerView', () => {
  it('renders a SchedulerView component', () => {
    const wrapper: VueWrapper<any> = mount(SchedulerView);
    expect(wrapper.html()).toContain('<div class="scheduler">');
  });
});

describe('Date methods test', () => {
  describe('isDateInRange', () => {
    const wrapper: VueWrapper<any> = mount(SchedulerView);
    const vm = wrapper.vm;

    it('should return true if date is in range', () => {
      const result = vm.isDateInRange('2024-11-01T00:00:00Z', '2024-11-03T00:00:00Z', new Date('2024-11-03T00:00:00Z'));
      expect(result).toBe(true);
    });

    it('should return false if date is not in range', () => {
      const result = vm.isDateInRange('2024-11-01T00:00:00Z', '2024-11-03T00:00:00Z', new Date('2024-11-06T00:00:00Z'));
      expect(result).toBe(false);
    });
  });
});