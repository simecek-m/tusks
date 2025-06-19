import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "component/common/Spinner";

const meta: Meta<typeof Spinner> = {
  title: "Spinner",
  component: Spinner,
};

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Primary: Story = {
  args: {},
};
