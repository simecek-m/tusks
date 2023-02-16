import { ComponentMeta, ComponentStory } from "@storybook/react";
import Card from "component/Card";

export default {
  title: "Card",
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Base = Template.bind({});

Base.args = {
  children: (
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi numquam eius
      unde dolor sunt, excepturi possimus blanditiis dolorem at vitae dolores,
      rem quia nihil provident laudantium saepe, ullam temporibus. Natus.
    </div>
  ),
};
