import { ComponentMeta, ComponentStory } from "@storybook/react";

import Button from "component/button/Button";

export default {
  title: "Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
export const Error = Template.bind({});
export const PrimarySubmitting = Template.bind({});
export const PrimaryInvalid = Template.bind({});

Primary.args = {
  children: "Sign In",
  isDisabled: false,
  isSubmitting: false,
  icon: "lock",
  hoverIcon: "key",
  variant: "primary",
};

Error.args = {
  ...Primary.args,
  children: "Remove",
  icon: "trash-alt",
  hoverIcon: "user-xmark",
  variant: "error",
};

PrimarySubmitting.args = {
  ...Primary.args,
  isSubmitting: true,
};

PrimaryInvalid.args = {
  ...Primary.args,
  isDisabled: true,
};
