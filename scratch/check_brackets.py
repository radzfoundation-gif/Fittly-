
with open('/run/media/radea/DATA/fitverse/landing-pages/src/app/workspace/page.tsx', 'r') as f:
    lines = f.readlines()

balance_curly = 0
balance_round = 0
for i, line in enumerate(lines):
    for char in line:
        if char == '{': balance_curly += 1
        elif char == '}': balance_curly -= 1
        elif char == '(': balance_round += 1
        elif char == ')': balance_round -= 1
    
print(f"Final curly: {balance_curly}")
print(f"Final round: {balance_round}")
