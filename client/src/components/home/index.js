import React, {useEffect, useReducer} from 'react'
import {Grid} from '@material-ui/core'
import ArticleCard from "../../utils/articleCard";

import {useDispatch, useSelector} from 'react-redux';
import {getArticlesTC} from '../../store/actions/article_actions'

const initialState = {
    sortBy: "_id",
    order: "desc",
    limit: 8,
    skip: 0
}

const reducer = (state, newState ) => {
    return {...state, ...newState}
}


const Home = () => {
    const articles = useSelector(state => state.articles)
    const dispatch = useDispatch()


    useEffect(()=> {
        if (articles && !articles.articles) {
            dispatch(getArticlesTC(initialState))
        }
    }, [dispatch, articles])


    return (
        <div className='mt-5'>
            <div>CARROUSEL</div>
            <Grid container spacing={3} className='article-card'>
                <Grid key={1} item xs={12} sm={6} lg={3}>
                    <ArticleCard/>
                </Grid>
                <Grid key={1} item xs={12} sm={6} lg={3}>
                    <ArticleCard/>
                </Grid>
                <Grid key={1} item xs={12} sm={6} lg={3}>
                    <ArticleCard/>
                </Grid>
                <Grid key={1} item xs={12} sm={6} lg={3}>
                    <ArticleCard/>
                </Grid>
                <Grid key={1} item xs={12} sm={6} lg={3}>
                    <ArticleCard/>
                </Grid>
            </Grid>
        </div>
    )
}

export default Home
