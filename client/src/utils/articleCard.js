import React from 'react'

import {Link as RouterLink} from 'react-router-dom'
import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    IconButton,
    Typography,
    Button, CardActionArea
} from '@material-ui/core'

import FavoriteIcon from '@material-ui/icons/Favorite';


const ArticleCard = ({article}) => {
    return (
        <Card>
            <CardMedia style={{height: 0, paddingTop: '56.25%'}}
                       image='http://picsum.photos/200'
                       title='some title'
            >
            </CardMedia>
            <CardContent>
                <Typography gutterBottom variant='h5'>
                    SOME TITLE
                </Typography>
                <Typography variant='body2' component='p'>
                    Lorem Ipsum ist ein einfacher Demo-Text für die Print- und Schriftindustrie. Lorem Ipsum ist in der Industrie bereits der Standard Demo-Text seit 1500, als ein unbekannter Schriftsteller eine Hand voll Wörter nahm und diese durcheinander warf um ein Musterbuch zu erstellen. Es hat nicht nur 5 Jahrhunderte überlebt, sondern auch in Spruch in die elektronische Schriftbearbeitung geschafft (bemerke, nahezu unverändert). Bekannt wurde es 1960, mit dem erscheinen von "Letraset", welches Passagen von Lorem Ipsum enhielt, so wie Desktop Software wie "Aldus PageMaker" - ebenfalls mit Lorem Ipsum.
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton>
                    <FavoriteIcon/>
                </IconButton>
                <Button size='small' color='primary' component={RouterLink} to='/article/id'>
                    view article
                </Button>
            </CardActions>
        </Card>
    )
}

export default ArticleCard
