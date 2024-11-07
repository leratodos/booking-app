import { describe, it, expect, beforeEach } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import SchedulerView from "./SchedulerView.vue";

describe("SchedulerView", () => {
  let wrapper: VueWrapper<InstanceType<typeof SchedulerView>>;
  let vm: InstanceType<typeof SchedulerView>;

  beforeEach(() => {
    wrapper = mount(SchedulerView);
    vm = wrapper.vm;
  });

  it("renders a SchedulerView component", () => {
    expect(wrapper.html()).toContain('<div class="scheduler">');
  });

  describe("Date methods test", () => {
    describe("isDateInRange", () => {
      const start = "2024-11-01T00:00:00Z";
      const end = "2024-11-03T00:00:00Z";

      it("should return true if date is within the range", () => {
        const result = vm.isDateInRange(
          start,
          end,
          new Date("2024-11-02T00:00:00Z"),
        );
        expect(result).toBe(true);
      });

      it("should return false if date is outside the range", () => {
        const result = vm.isDateInRange(
          start,
          end,
          new Date("2024-11-06T00:00:00Z"),
        );
        expect(result).toBe(false);
      });
    });

    describe("isToday", () => {
      it("should return true if date is today", () => {
        const result = vm.isToday(new Date());
        expect(result).toBe(true);
      });

      it("should return false if date is not today", () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const result = vm.isToday(yesterday);
        expect(result).toBe(false);
      });

      it("should return false if date is invalid", () => {
        const result = vm.isToday(new Date("invalid"));
        expect(result).toBe(false);
      });
    });

    describe("isHoliday", () => {
      it("should return true if it is holiday", () => {
        const holiday = vm.isHoliday(new Date("2024-11-02T00:00:00Z"));
        expect(holiday).toBe(true);
      });
      it("should return false if it is not holiday", () => {
        const notHoliday = vm.isHoliday(new Date("2024-11-01T00:00:00Z"));
        expect(notHoliday).toBe(false);
      });
      it("should return false if it is not valid date", () => {
        const result = vm.isHoliday(new Date("invalid"));
        expect(result).toBe(false);
      });
    });
  });
});
