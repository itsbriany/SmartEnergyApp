#!/bin/bash

mongoimport --db SmartEnergy --collection SmartEneryData --type json --file SmartEnergyData.json --jsonArray
