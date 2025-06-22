import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "component/button/Button";

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Sign In",
    isDisabled: false,
    isSubmitting: false,
    icon: "lock",
    hoverIcon: "key",
    variant: "primary",
  },
};

export const Error: Story = {
  args: {
    ...Primary.args,
    children: "Remove",
    icon: "trash-alt",
    hoverIcon: "user-xmark",
    variant: "error",
  },
};

export const PrimarySubmitting: Story = {
  args: {
    ...Primary.args,
    isSubmitting: true,
  },
};

export const PrimaryInvalid: Story = {
  args: {
    ...Primary.args,
    isDisabled: true,
  },
};
