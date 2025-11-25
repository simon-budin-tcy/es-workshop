# ES Playground

This project is an angular application used in a demo talking about analysis in Elasticsearch Database engine.

This is supposed to be used in conjunction with the excalidraw at https://excalidraw.com/#room=752d1d439f587fd0eaf9,P9DqwabQvzs8dmRE4OnODA

<img width="1531" height="1006" alt="image" src="https://github.com/user-attachments/assets/f910839e-8e06-4e6f-8b68-bd756946badf" />


## Running the angular demo application

```
npm install
npm start
```

## Creating the demo ES indices

> Prerequisite: have the VSCode `Rest Client` extension ready

The different indices are created from the `http-calls` folder. All the steps create the same basic index with 2 fields: an id and a title.

What's changing in each step is the analysis performed on those fields.

Start with the step 1 http file, run each http request using Rest Client to:
- delete the index (not needed the first time)
- create the index with step-specific settings
- bulk insert the same data over and over in the index using the data located in the `bulk-content` file

Step 1 correspond to the diagram in excalidraw.

And the logic is the same until step 5, adding more and more features at each step.

Note: every time you recreate the index, you need to reload the angular app page.

## The angular app

It allows testing for different scenarios of substring and ascii folding situations. Just play around with the title search.
There's also a tab showing details of the analyzers (provided they are available in the current step).


