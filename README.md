# Safety Outlier Explorer
![alt tag](https://user-images.githubusercontent.com/31038805/32173925-d40b050a-bd56-11e7-8750-1bc631296376.gif)

## Overview 
Safety Outlier Explorer is a JavaScript library built using Webcharts ([1](https://github.com/RhoInc/Webcharts), [2](https://github.com/RhoInc/webcharts-wrapper-boilerplate)) that allows users to view clinical outcomes such as lab results and vital signs over time and to identify values that fall outside of expected ranges. Clicking on a point or line generates a participant-level plot for each measure in the data:

![Example](https://github.com/RhoInc/safety-outlier-explorer/wiki/img/all-measures.PNG)

Users can view any outcome in the data and specify a linear (study day) or ordinal (study visit) x-axis; the full functionality is described [here](https://github.com/RhoInc/safety-outlier-explorer/wiki/Technical-Documentation).
The library expects an [ADaM-esque data structure](https://www.cdisc.org/system/files/members/standard/foundational/adam/analysis_data_model_v2.1.pdf) by default but can be customized to use any dataset that is one row per participant per timepoint per measure.
Full details about chart configuration are [here](https://github.com/RhoInc/safety-outlier-explorer/wiki/Configuration).

## Usage
The code to initialize the chart looks like this: 

```javascript

    d3.csv(
        'https://rawgit.com/RhoInc/viz-library/master/data/safetyData/ADBDS.csv',
        function(data) {
            safetyOutlierExplorer('body', {}).init(data);
        }
    );

```

The chart can be configured to facilitate non-standard data formats and to alter the chart itself. Overwrite the defaults with a custom settings object like so:

```javascript

    const settings = {
        time_cols: [
            {
                value_col: 'AVISIT',
                type: 'ordinal',
                label: 'Visit',
                rotate_tick_labels: true,
                vertical_space: 100
            },
            {
                value_col: 'ADY',
                type: 'linear',
                label: 'Study Day',
                rotate_tick_labels: false,
                vertical_space: 0
            }
        ],
        measure_col: 'PARAM',
        value_col: 'AVAL',
        normal_col_low: 'ANRLO',
        normal_col_high: 'ANRHI',
        filters: [
            {value_col: 'TRT01P', label: 'Treatment Group'},
            {value_col: 'SEX', label: 'Sex'},
            {value_col: 'RACE', label: 'Race'}
        ],
        details: [
            {value_col: 'AGE', label: 'Age'}
            {value_col: 'SEX', label: 'Sex'},
            {value_col: 'RACE', label: 'Race'},
            {value_col: 'TRT01P', label: 'Treatment Group'}
        ],
    };

    d3.csv(
        'ADBDS.csv',
        function(data) {
            safetyOutlierExplorer('body', settings).init(data);
        }
    );

```

## Links 
- [Interactive Example](https://rhoinc.github.io/safety-outlier-explorer/test-page/)
- [Configuration](https://github.com/RhoInc/safety-outlier-explorer/wiki/Configuration) 
- [API](https://github.com/RhoInc/safety-outlier-explorer/wiki/API)
- [Technical Documentations](https://github.com/RhoInc/safety-outlier-explorer/wiki/Technical-Documentation) 
- [Data Guidelines](https://github.com/RhoInc/safety-outlier-explorer/wiki/Data-Guidelines)

## P004 nextgen functional requirements status

This section tracks the nextgen Chart.js spike against the legacy wiki requirements. The current spike is intentionally partial; unmet items become migration backlog before any replacement release.

| Requirement area | Legacy requirement summary | Spike status |
|---|---|---|
| Measure filter | Select the safety measure/lab variable displayed. | Implemented in spike. |
| Configured filters | Filter by pre-selected characteristics. | Partial: treatment-group filter implemented. |
| Participant count | Display participants shown and percentage of total. | Implemented in spike. |
| X-axis control | Toggle study day, visit, or visit number. | Partial: VISITN/VISIT/DY selector implemented when data are present. |
| Longitudinal traces | Show participant-level values over time. | Partial: limited participant trace rendering implemented. |
| Outlier interactions | Identify outliers, hover/click points, and show detailed records. | Partial: listing path implemented; outlier classification not implemented. |
| Regression coverage | Validate measure/filter/x-axis changes, participant count, point interactions, and listing. | Not started; requires automated browser tests. |
