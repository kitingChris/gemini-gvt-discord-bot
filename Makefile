ifneq (,$(wildcard ./.env))
    include .env
    export
endif

build: 
	docker build -t gemini-gvt-discord-bot .

run: clean build
	docker run -d --name gemini-gvt-discord-bot -e DISCORD_TOKEN=$$DISCORD_TOKEN -e GOOGLE_API_KEY=$$GOOGLE_API_KEY gemini-gvt-discord-bot
	docker logs -f gemini-gvt-discord-bot

clean:
	docker rm -f gemini-gvt-discord-bot
