/* =============================================
                    Imports
============================================= */
// Packages
import React from 'react';
import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
// Types
// Components
import ReactStarter from './ReactStarter';
// Environment
// Styles
// States
/* =============================================
                    Utils
============================================= */
/* =============================================
                    Main
============================================= */
describe("Page loader", () => {
    test("Renders in", () => {
        render(<ReactStarter />)
        expect(screen.getByText('React starter')).toBeInTheDocument()
    })
})