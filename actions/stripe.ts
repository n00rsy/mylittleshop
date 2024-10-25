'use server'

import Stripe from 'stripe'
import { updateUser } from './user'

const stripe = new Stripe(process.env.STRIPE_SECRECT_KEY_TEST!)
const app_url = process.env.APP_URL

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
}

export const onboardStripeAccount = async function (accountId: string) {
    const accountLink = await stripe.accountLinks.create({
        account: accountId,
        refresh_url: `${app_url}/dashboard/stripe/retry`,
        return_url: `${app_url}/dashboard/`,
        type: 'account_onboarding'
    })
    console.log('accountlink:', accountLink)
    return accountLink.url
}

export const updateStripeAccount = async function (userData: any) {
    console.log("updateStripeAccount", userData)

    const accountLink = await stripe.accountLinks.create({
        account: userData.stripe.accountId,
        refresh_url: `${app_url}/dashboard/stripe/retry`,
        return_url: `${app_url}/stripe/account-updated`,
        type: 'account_update'
    })
    console.log('accountlink:', accountLink)
    return accountLink.url
}

export const getStripeAccount = async function (accountId: string) {
    const stripeAccount = await stripe.accounts.retrieve(accountId)
    console.log(stripeAccount)
    console.log(stripeAccount)
    return stripeAccount
}

export const isStripeAccountOnboarded = async function (accountId: string) {
    const stripeAccount = await stripe.accounts.retrieve(accountId)
    console.log(stripeAccount)
    return stripeAccount.charges_enabled &&
        stripeAccount.payouts_enabled &&
        stripeAccount.requirements?.currently_due?.length === 0
}

export const createStripeLoginLink = async function (accountId: string) {
    const loginLink = await stripe.accounts.createLoginLink(accountId);
    return loginLink.url
}

export const createStripeSession = async function (accountId: string) {
    try {
        const accountSession = await stripe.accountSessions.create({
            account: accountId,
            components: {
                payments: {
                    enabled: true,
                    features: {
                        refund_management: true,
                        dispute_management: true,
                        capture_payments: true,
                    }
                },
                account_onboarding: {
                    enabled: true,
                },
                account_management: {
                    enabled: true
                },
                payouts: {
                    enabled: true,
                },
                balances: {
                    enabled: true,
                },
            }
        })
        return { secret: accountSession.client_secret }
    }
    catch (error) {
        return { error: error }
    }
}
