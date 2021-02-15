import React from 'react'
import {Switch, Route, BrowserRouter} from 'react-router-dom'
import GoogleFontLoader from 'react-google-font-loader'
import Home from './components/home'

import Header from './components/navigation/header'

import MainLayout from "./hoc/mainLayout";


const Routes = () => {
    return (
        <BrowserRouter>
            <Header/>
            <MainLayout>
                <Switch>
                    <Route path='/' component={Home}></Route>
                </Switch>
            </MainLayout>            
            <GoogleFontLoader
                fonts={[
                    {
                        font: 'Roboto',
                        weights: [300, 400, 700],
                    },
                    {
                        font: 'Fredoka One'

                    },
                ]}
                subsets={['cyrillic-ext', 'greek']}
            />
        </BrowserRouter>
    )
}

export default Routes;
