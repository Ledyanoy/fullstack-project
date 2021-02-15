import React from 'react'
import {Grid} from '@material-ui/core'
import ArticleCard from "../../utils/articleCard";


const Home = () => {
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
