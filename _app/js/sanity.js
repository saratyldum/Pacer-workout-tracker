import { SanityClient } from "./util/sanity-client.js";
import { SanityClientMutate } from "./util/sanity-client-mutate.js";

/**
 * Please note:
 * 	I am very aware of the fact that I am exposing my token, allowing anyone to use it
 * 	and make changes  to my dataset. This is a problem when it comes to frontend
 * 	projects and it' only implemented like this in this final project for the sake of
 * 	simplicity.
 */

export const sanityMutate = SanityClientMutate({
	id: 'qtf22vsb',
	dataset: 'production',
	version: '2023-04-01',
	token: 'skRcExR4jRJ3YRSisY87pphlTwNuRuXiiq6T5ZShLf1Vfa5aItI6pIuOahlId4Njkc8sEINZetNV6B7bNEJI4cu6pTqmAo38BdqWo0jz7xhgCXq6cuTt02N9QowVW3GuYudLmiarZ8bIqwxBYVhvvodD9Nj86ijkv4lmEdlNRVyQPBoXq2tD'
})


export const sanity = SanityClient({
	id: 'qtf22vsb',
	dataset: 'production',
	version: '2023-04-01',
	token: 'skRcExR4jRJ3YRSisY87pphlTwNuRuXiiq6T5ZShLf1Vfa5aItI6pIuOahlId4Njkc8sEINZetNV6B7bNEJI4cu6pTqmAo38BdqWo0jz7xhgCXq6cuTt02N9QowVW3GuYudLmiarZ8bIqwxBYVhvvodD9Nj86ijkv4lmEdlNRVyQPBoXq2tD'
})