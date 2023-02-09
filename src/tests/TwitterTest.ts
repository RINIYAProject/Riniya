import { Client as TwitterClient } from "twitter-api-sdk";
import ora from "ora"
import BaseTest, { Result } from "./BaseTest";

const client = new TwitterClient("")

export default class TwitterTest extends BaseTest {
    public constructor() {
        super("twitter_test")
    }

    protected handle(): Result {
        this.updateText("Loading twitter.")
        return "FAILED"
    }
}