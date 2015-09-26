#!/bin/bash

mongoimport --db SmartEnergy --collection smartenergydatas --type json --file SmartEnergyData.json --jsonArray
