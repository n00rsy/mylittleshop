'use server'

import Stripe from 'stripe'
import { updateUser } from './user'

const stripe = new Stripe(process.env.STRIPE_SECRECT_KEY_TEST!)

export const createStripeAccount = async function (userData: any) {
    console.log("createStripeAccount", userData)
    const account = await stripe.accounts.create({
        type: "express",
        email: userData.email,
    })

    console.log('account: ', account)
    const updateDetails = {
        stripe: {
            accountId: account.id
        }
    }

    await updateUser(userData._id, updateDetails)

    return onboardStripeAccount(account.id)
}

export const onboardStripeAccount = async function (accountId:string) {
    const accountLink = await stripe.accountLinks.create({
        account: accountId,
        refresh_url: 'http://localhost:3000/stripe/retry',
        return_url: 'http://localhost:3000/dashboard/0/home',
        type: 'account_onboarding'
    })
    console.log('accountlink:', accountLink)
    return accountLink.url
}

export const updateStripeAccount = async function (userData: any) {
    console.log("createStripeAccount", userData)

    const accountLink = await stripe.accountLinks.create({
        account: userData.stripe.accountId,
        refresh_url: 'http://localhost:3000/stripe/retry',
        return_url: 'http://localhost:3000/stripe/account-updated',
        type: 'account_update'
    })
    console.log('accountlink:', accountLink)
    return accountLink.url
}

export const getStripeAccount = async function (accountId: string) {
    const stripeAccount = await stripe.accounts.retrieve(accountId)
    console.log(stripeAccount)
    console.log(stripeAccount)
    return stripeAccount.object
}

export const isStripeAccountOnboarded = async function (accountId: string) {
    const stripeAccount = await stripe.accounts.retrieve(accountId)
    console.log(stripeAccount)
    return stripeAccount.charges_enabled &&
        stripeAccount.payouts_enabled &&
        stripeAccount.requirements?.currently_due?.length === 0
}
