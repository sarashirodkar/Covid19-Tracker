import React from 'react';
import {Card,CardContent, Typography} from "@material-ui/core";
import './InfoBox.css';
import { prettyPrintStat } from './util';

function InfoBox({title,cases,total,active,...props}) {
    return (
        <Card className={`infoBox ${active && props.isCases && "infoBox--isCases"} 
                                  ${active && props.isRecovered && "infoBox--isRecovered"}
                                  ${active && props.isDeaths && "infoBox--isDeaths"}`} onClick={props.onClick}>
            <CardContent>
                <Typography className="infoBox__title" color="textSecondary">{title}</Typography>
                <h2 className={`infoBox__cases ${props.isCases && "infoBox--isCasesColor"} 
                                  ${props.isRecovered && "infoBox--isRecoveredColor"}
                                  ${props.isDeaths && "infoBox--isDeathsColor"}`}>{prettyPrintStat(cases)}</h2>
                <Typography className="infoBox__total" color="textSecondary">{prettyPrintStat(total)}Total</Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
