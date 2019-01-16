var partyData = {
    "Andhra Pradesh": {
        labels: ["TDP", "YSRCP", "BJP", "Vacant"],
        data: [15, 3, 2, 5]
    },
    "Arunanchal Pradesh": {
        labels: ["INC", "BJP"],
        data: [1, 1]
    },
    "Assam": {
        labels: ["BJP", "AIUDF", "INC", "Independent"],
        data: [7, 3, 3, 1]
    },
    "Bihar": {
        labels: ["RLSP", "BJP", "INC", "LJP", "RJD", "JDU", "Vacant"],
        data: [3, 21, 1, 6, 4, 2, 3]
    },
    "Chhattisgarh": {
        labels: ["BJP", "INC", "Vacant"],
        data: [10, 0, 1]
    },
    "Goa": {
        labels: ["BJP", "INC"],
        data: [2, 0]
    },
    "Gujarat": {
        labels: ["BJP", "INC"],
        data: [26, 0]
    },
    "Haryana": {
        labels: ["BJP", "INLD", "Congress"],
        data: [7, 2, 1]
    },
    "Himachal Pradesh": {
        labels: ["BJP", "INC"],
        data: [4, 0]
    },
    "Jammu & Kashmir": {
        labels: ["PDP", "NC", "BJP", "INC", "Vacant"],
        data: [1, 1, 2, 1, 1]
    },
    "Jharkhand": {
        labels: ["BJP", "JMM"],
        data: [12, 2]
    },
    "Karnataka": {
        labels: ["BJP", "INC", "JDS", "Vacant"],
        data: [15, 10, 2, 1]
    },
    "Kerala": {
        labels: ["INC", "CPIM", "IUML", "Independent", "CPI", "RSP", "Vacant"],
        data: [7, 5, 2, 2, 1, 1, 2]
    },
    "Madhya Pradesh": {
        labels: ["BJP", "INC", "Vacant"],
        data: [26, 2, 1]
    },
    "Maharashtra": {
        labels: ["BJP", "Shivsena", "INC", "NCP", "Swabhimani"],
        data: [22, 18, 2, 5, 1]
    },
    "Manipur": {
        labels: ["INC", "BJP"],
        data: [2, 0]
    },
    "Meghalaya": {
        labels: ["INC", "NPP", "Vacant"],
        data: [1, 0, 1]
    },
    "Mizoram": {
        labels: ["INC", "BJP"],
        data: [1, 0]
    },
    "Nagaland": {
        labels: ["NPF", "NDPP"],
        data: [0, 1]
    },
    "Odisha": {
        labels: ["BJP", "BJD", "Vacant"],
        data: [1, 19, 1]
    },
    "Punjab": {
        labels: ["BJP", "SAD", "INC", "AAP"],
        data: [1, 4, 4, 4]
    },
    "Rajasthan": {
        labels: ["BJP", "INC", "Vacant"],
        data: [22, 1, 2]
    },
    "Sikkim": {
        labels: ["SDF"],
        data: [1]
    },
    "Tamil Nadu": {
        labels: ["AIADMK", "PMK", "DMK", "BJP"],
        data: [37, 1, 0, 1]
    },
    "Telangana": {
        labels: ["TRS", "INC", "BJP", "AIMIM", "YSRCP"],
        data: [9, 2, 1, 1, 1]
    },
    "Tripura": {
        labels: ["CPIM"],
        data: [2]
    },
    "Uttar Pradesh": {
        labels: ["BJP", "INC", "SP", "BSP", "RLD", "Apna Dal"],
        data: [68, 2, 7, 0, 1, 2]
    },
    "Uttarakhand": {
        labels: ["BJP", "INC"],
        data: [5, 0]
    },
    "West Bengal": {
        labels: ["AITC", "INC", "BJP", "CPIM"],
        data: [34, 4, 2, 2]
    },
    "Andaman & Nicobar Island": {
        labels: ["BJP"],
        data: [1]
    },
    "Chandigarh": {
        labels: ["BJP"],
        data: [1]
    },
    "Dadara & Nagar Havelli": {
        labels: ["BJP"],
        data: [1]
    },
    "Daman & Diu": {
        labels: ["BJP"],
        data: [1]
    },
    "Lakshadweep": {
        labels: ["NCP"],
        data: [1]
    },
    "NCT of Delhi": {
        labels: ["BJP"],
        data: [7]
    },
    "Puducherry": {
        labels: ["AINRC"],
        data: [1]
    }
}

var janDhanYojana = {
    topfive: {
        labels: ["Uttar Pradesh", "Bihar", "West Bengal", "Madhya Pradesh", "Rajasthan"],
        data: [5.21, 3.76, 3.26, 2.95, 2.38]
    },
    toptenpercentage: {
        labels: ["Chhattisgarh", "Assam", "Madhya Pradesh", "Jharkhand", "Bihar", "West Bengal"],
        data: [53.88, 45.78, 40.66, 36.28, 36.15, 35.80]
    }
}

var mudraYojana = {
    "Andhra Pradesh": {
        labels: ["2015-16", "2016-17", "2017-18"],
        data: [5790.79, 5731.8, 10214.1]
    },
    "Arunanchal Pradesh": {
        labels: ["2015-16", "2016-17", "2017-18"],
        data: [71.62, 78.67, 103.27]
    },
    "Assam": {
        labels: ["2015-16", "2016-17", "2017-18"],
        data: [1728.46, 4824.54, 6570.32]
    },
    "Bihar": {
        labels: ["2015-16", "2016-17", "2017-18"],
        data: [7265.91, 11585.63, 15396.75]
    },
    "Chhattisgarh": {
        labels: ["2015-16", "2016-17", "2017-18"],
        data: [2156.14, 3209.86, 4501.48]
    },
    "Goa": {
        labels: ["2015-16", "2016-17", "2017-18"],
        data: [376.04, 372.78, 484.45]
    },
    "Gujarat": {
        labels: ["2015-16", "2016-17", "2017-18"],
        data: [5910.02, 7692.07, 11202.52]
    },
    "Haryana": {
        labels: ["2015-16", "2016-17", "2017-18"],
        data: [3152.62, 3697.59, 5745.03]
    },
    "Himachal Pradesh": {
        labels: ["2015-16", "2016-17", "2017-18"],
        data: [965.7, 1214.02, 1801.44]
    },
    "Jammu & Kashmir": {
        labels: ["2015-16", "2016-17", "2017-18"],
        data: [1152.15, 1663.51, 2514.84]
    },
    "Jharkhand": {
        labels: ["2015-16", "2016-17", "2017-18"],
        data: [2845.66, 3908.99, 5233.05]
    },
    "Karnataka": {
        labels: ["2015-16", "2016-17", "2017-18"],
        data: [16469.43, 17290.7, 22500.67]
    },
    "Kerala": {
        labels: ["2015-16", "2016-17", "2017-18"],
        data: [4727.38, 6140.44, 9282.57]
    },
    "Madhya Pradesh": {
        labels: ["2015-16", "2016-17", "2017-18"],
        data: [7769.29, 10191.91, 14357.52]
    },
    "Maharashtra": {
        labels: ["2015-16", "2016-17", "2017-18"],
        data: [13372.42, 16976.76, 22266.2]
    },
    "Manipur": {
        labels: ["2015-16", "2016-17", "2017-18"],
        data: [120.03, 142.47, 200.68]
    },
    "Meghalaya": {
        labels: ["2015-16", "2016-17", "2017-18"],
        data: [162.41, 185.74, 212.04]
    },
    "Mizoram": {
        labels: ["2015-16", "2016-17", "2017-18"],
        data: [77.78, 90.31, 152.9]
    },
    "Nagaland": {
        labels: ["2015-16", "2016-17", "2017-18"],
        data: [76.54, 103.83, 124.61]
    },
    "Odisha": {
        labels: ["2015-16", "2016-17", "2017-18"],
        data: [5436.26, 7600.68, 11115.88]
    },
    "Punjab": {
        labels: ["2015-16", "2016-17", "2017-18"],
        data: [3484.49, 4512.28, 6524.12]
    },
    "Rajasthan": {
        labels: ["2015-16", "2016-17", "2017-18"],
        data: [5248.28, 8823.3, 13503.76]
    },
    "Sikkim": {
        labels: ["2015-16", "2016-17", "2017-18"],
        data: [54.61, 96.54, 112.65]
    },
    "Tamil Nadu": {
        labels: ["2015-16", "2016-17", "2017-18"],
        data: [15496.86, 17756.39, 24980.92]
    },
    "Telangana": {
        labels: ["2015-16", "2016-17", "2017-18"],
        data: [3694.34, 3780.49, 6430.81]
    },
    "Tripura": {
        labels: ["2015-16", "2016-17", "2017-18"],
        data: [337.26, 968.55, 1460.6]
    },
    "Uttar Pradesh": {
        labels: ["2015-16", "2016-17", "2017-18"],
        data: [11880.93, 14753.59, 21174.46]
    },
    "Uttarakhand": {
        labels: ["2015-16", "2016-17", "2017-18"],
        data: [1745.08, 1913.88, 2480.09]
    },
    "West Bengal": {
        labels: ["2015-16", "2016-17", "2017-18"],
        data: [7740.41, 15480.03, 19970.76]
    },
    "Andaman & Nicobar Island": {
        labels: ["2015-16", "2016-17", "2017-18"],
        data: [212.78, 78.34, 100.26]
    },
    "Chandigarh": {
        labels: ["2015-16", "2016-17", "2017-18"],
        data: [204.52, 221.26, 409.15]
    },
    "Dadara & Nagar Havelli": {
        labels: ["2015-16", "2016-17", "2017-18"],
        data: [21.27, 22.61, 36.3]
    },
    "Daman & Diu": {
        labels: ["2015-16", "2016-17", "2017-18"],
        data: [12.02, 12.08, 22.56]
    },
    "Lakshadweep": {
        labels: ["2015-16", "2016-17", "2017-18"],
        data: [5.35, 4.51, 11.53]
    },
    "NCT of Delhi": {
        labels: ["2015-16", "2016-17", "2017-18"],
        data: [2857.97, 3700.51, 4357.35]
    },
    "Puducherry": {
        labels: ["2015-16", "2016-17", "2017-18"],
        data: [331.91, 485.49, 881.77]
    }
}


var partyColor = {
    "Bharatiya Janata Party": "#ff7900",
    "Indian National Congress": "#00cccc",
    "POK": "#EDEDED",
    "Vacant": "#EDEDED",
    "Telugu Desam Party": "#ffed00",
    "YSR Congress Party": "#0062ff",
    "All India United Democratic Front": "#bf9719",
    "Independent": "#9c9c9c",
    "Rashtriya Lok Samta Party": "#cd0000",
    "Lok Janshakti Party": "#41007a",
    "Rashtriya Janata Dal": "#009200",
    "Janata Dal (United)": "#003366",
    "Indian National Lok Dal": "#004a00",
    "Jammu and Kashmir National Conference": "#ff3d3d",
    "Jharkhand Mukti Morcha": "#ff6f67",
    "Janata Dal (Secular)": "#80dd2f",
    "Communist Party of India (Marxist)": "#ff0000",
    "Shiv Sena": "#ffaf00",
    "Nationalist Congress Party": "#0093AF",
    "Biju Janata Dal": "#005f00",
    "Shiromani Akali Dal": "#ff6800",
    "Aam Aadmi Party": "#00b549",
    "All India Anna Dravida Munnetra Kazhagam": "#009900",
    "Telangana Rashtra Samithi": "#ff89ce",
    "Samajwadi Party": "#841e00",
    "All India Trinamool Congress": "#1bea29",
    "Apna Dal": "#6b00c9",
    "All India N.R. Congress": "#ffaa4f",
    "Nationalist Democratic Progressive Party": "#fd4242",
    "Pattali Makkal Katchi": "#0000b5",
    "Sikkim Democratic Front": "#ff0000",
    "Indian Union Muslim League": "#006c00",
    "Rashtriya Lok Dal": "#330066",
    "Revolutionary Socialist Party": "#ff0000",
    "Jammu and Kashmir Peoples Democratic Party": "#008970",
    "Swabhimani Paksha": "#c900a5",
    "POK": "#EDEDED"
}