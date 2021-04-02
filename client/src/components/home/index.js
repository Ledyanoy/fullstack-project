import React, {useEffect, useReducer} from 'react';
import {Grid} from '@material-ui/core';
import ArticleCard from "../../utils/articleCard";

import {useDispatch, useSelector} from 'react-redux';
import {getArticlesTC} from '../../store/actions/article_actions';


const initialSort = {
    sortBy: "_id",
    order: "desc",
    limit: 8,
    skip: 0
};

const reducer = (state, newState) => {
    return {...state, ...newState}
};


const Home = () => {
    const articles = useSelector(state => state.articles)
    const dispatch = useDispatch()

    const [sort, setSort] = useReducer((state, newState) => ({...state, ...newState}), initialSort)


    useEffect(() => {
        if (articles && !articles.articles) {
            dispatch(getArticlesTC(initialSort))
        }
    }, [dispatch, articles])


    return (
        <div className='mt-5'>
            <div>CARROUSEL</div>
            <Grid container spacing={3} className='article-card'>
                {articles.articles &&
                articles.articles.map(article => {
                    return <Grid key={article._id} item xs={12} sm={6} lg={3}>
                        <ArticleCard article={article}/>
                    </Grid>
                })
                }
                <button onClick={() => {
                    let skip = sort.skip + sort.limit
                    dispatch(getArticlesTC({...sort, skip: skip}))
                    setSort({skip:skip})
                }}>
                    Load More
                </button>
            </Grid>
        </div>
    )
};

export default Home
