import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react';
import ReactStarter from './ReactStarter';

const story: ComponentMeta<typeof ReactStarter> = {
    title: 'ReactStarter',
    component: ReactStarter,
}

export default story

export const Primary: ComponentStory<typeof ReactStarter> = () => (
    <ReactStarter />
);