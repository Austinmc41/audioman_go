# Process

1. Add a page with a checkbox that asks for panning first or not. Then save this for the conditions in step 7.
2. Next have a consent form (See IRB documents / exempt_consent form) with a button that says the last line of the consent form document. Save a bool in the global json saying the participant consented.
3. Then have a page where the user fills out demographic information (age, gender, race, musical ability, anxiety level on tests, hearing level) See the questions document in IRB Files / Questions.
4. Next, have a page with buttons or a select with all sounds where the user can play the sounds and learn them.
5. Next have a test page with 3 sounds play at once with a test story. These are the training_sounds.
6. The first condition will be a control story with no sounds and just the questions for the story.
7. Now, using the condition selected to go first from step 1 (either pan or monaural). On each page, have a play button at the top that will hook into Auston's API to have sounds added to the speech. Connect this button to the web speech API and select one of the Google Chrome voices to play by default, and have the speech read with the web speech API. Under this, have the form with two sections, one section will be 20 select elements with 40 sound options from the getSoundNames function, and the second section with all the multiple choice questions about the story that's playing (taken from the JSON), and a next button.
8. When the participant hits next, add sounds 2 at a time using the checkNumSounds.
9. When they reach the end of the first set, have a page with the Nasa TLX, then move to the next condition (monaural or panning).
10. Repeat step 7, but with the other condition.
11. At the end of the second condition have the second Nasa TLX.
12. When the user completes the study, save their replies in a global state and have an option to download the replys in a json, or save to a mongoDB server.

