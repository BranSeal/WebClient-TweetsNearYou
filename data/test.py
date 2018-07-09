import json
from pprint import pprint

with open('2018-07-09_top.json') as f:
    data = json.load(f)

pprint(data)