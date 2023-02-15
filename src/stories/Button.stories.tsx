import { ComponentMeta, ComponentStory } from "@storybook/react";

import Button from "component/Button";

export default {
  title: "Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
export const Destructive = Template.bind({});

Primary.args = {
  children: "Sign In",
  disabled: false,
  isSubmitting: false,
  icon: "lock",
  hoverIcon: "key",
  variant: "primary",
};

Destructive.args = {
  children: "Remove",
  disabled: false,
  isSubmitting: false,
  icon: "trash-alt",
  hoverIcon: "user-xmark",
  variant: "destructive",
};
