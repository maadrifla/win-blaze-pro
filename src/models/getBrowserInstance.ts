import chromium from 'chrome-aws-lambda';
import puppeteer from 'puppeteer';

export async function getBrowserInstance() {
	const executablePath = await chromium.executablePath;

	if (!executablePath) {
		return puppeteer.launch({
			args: chromium.args,
			headless: false,
			defaultViewport: {
				width: 800,
				height: 900
			},
			ignoreHTTPSErrors: true
		});
	}

	return chromium.puppeteer.launch({
		args: chromium.args,
		defaultViewport: {
			width: 800,
			height: 900
		},
		executablePath,
		headless: chromium.headless,
		ignoreHTTPSErrors: true
	});
}
