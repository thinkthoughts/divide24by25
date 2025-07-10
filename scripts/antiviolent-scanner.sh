#!/bin/bash
forge inspect $1 --verify --rule "totalSupply * 24 / 25 >= maxBalance"
