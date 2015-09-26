#!/bin/bash

mongoimport --db SmartEnergy --collection SmartEnergyData --type json --file SmartEnergyData.json --jsonArray
