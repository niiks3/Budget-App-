import React from "react"
import {useIntl} from 'react-intl';
export const currencyFormatter = new Intl.NumberFormat(undefined, {
    currency : "GHS",
    style: 'currency',
    minimumFractionDigits: 0
})