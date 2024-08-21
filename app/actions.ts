'use server'

// Tony, Pepper, and their daughter Morgan want to fly from New York City to Atlanta. 
// They'll be leaving on 11th June and returning a week later on 18th June. 
// Tony and his family prefer flying business class.

import { Duffel } from '@duffel/api'

const duffel_At = process.env.DUFFEL_ACCESS_TOKEN || "not found";

const duffel = new Duffel({
  token: duffel_At,
})

export async function offerRequest() {
  try {
    const offerRequest = await duffel.offerRequests.create({
      slices: [
        // outbound flight (they live in NY and want to fly to ATL)
        {
          origin: "NYC",
          destination: "ATL",
          departure_date: "2024-08-22"  // Updated to match the scenario
        },
        // return flight (this is their return trip)
        {
          origin: "ATL",
          destination: "NYC",
          departure_date: "2024-08-24"  // Updated to match the scenario
        }
      ],
      passengers: [
        { type: "adult" }, 
        { type: "adult" }, 
        { age: 1 },
      ],
      cabin_class: "business",
    })

    // The offer request might not immediately return offers, so we need to poll for them
    const offers = await duffel.offers.list({ offer_request_id: offerRequest.data.id })

    console.log('Offers:', offers.data)
    return offers.data

  } catch (error) {
    console.error('Error fetching offers:', error)
    throw error
  }
}

