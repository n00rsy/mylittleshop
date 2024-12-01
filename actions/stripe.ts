'use server'

import Stripe from 'stripe'
import { updateUser } from './user'
import { createProduct } from './product'
import { ProductDocument, ProductVariation } from '@/models/Product'

const stripe = new Stripe(process.env.STRIPE_SECRECT_KEY_TEST!)
const app_url = process.env.APP_URL

export const createStripeAccount = async function (userData: any) {
    console.log("createStripeAccount", userData)
    const account = await stripe.accounts.create({
        type: "express",
        email: userData.email,
    })

    console.log('account: ', account)
    return account
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

export const updateStripeAccount = async function (accountId: string) {
    console.log("updateStripeAccount", accountId)

    const accountLink = await stripe.accountLinks.create({
        account: accountId,
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
    console.log('isStripeAccountOnboarded', (stripeAccount.charges_enabled &&
        stripeAccount.payouts_enabled &&
        stripeAccount.requirements?.currently_due?.length === 0))
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

export const createStripeProduct = async function (productInfo: ProductVariation) {
    console.log('createStripeProduct', productInfo)
    const product = await stripe.products.create({
        name: productInfo.name,
        active: productInfo.active,
        description: productInfo.description,
        tax_code: 'txcd_10000000', // TODO: FIX
        images: productInfo.images,
        default_price_data: {
            currency: "usd",
            tax_behavior: "inclusive",
            unit_amount: productInfo.price * 100 // convert to cents
        }
    });
    return product
}

export const getStripeProduct = async function (id: string) {
    return stripe.products.retrieve(id)
}

export const createStripePrice = async function (priceInfo: any) {
    const price = await stripe.prices.create({
        currency: "usd",
        product: priceInfo.product,
        tax_behavior: "inclusive",
        unit_amount: priceInfo.price
    })
    return price
}

export const getStripePrice = async function (id: string) {
    return stripe.prices.retrieve(id)
}
