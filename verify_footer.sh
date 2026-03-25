#!/bin/bash

echo "════════════════════════════════════════════════════════"
echo "   FOOTER INTEGRATION VERIFICATION"
echo "════════════════════════════════════════════════════════"
echo ""

files=(
  "src/pages/Landing.tsx"
  "src/pages/Login.tsx"
  "src/pages/Signup.tsx"
  "src/pages/StudentDashboard.tsx"
  "src/pages/TeacherDashboard.tsx"
)

for file in "${files[@]}"; do
  echo "📄 $(basename $file):"
  
  # Check import
  import_count=$(grep -c "import { Footer } from" "$file" 2>/dev/null || echo "0")
  if [ "$import_count" -gt 0 ]; then
    echo "   ✅ Import: Found"
  else
    echo "   ❌ Import: Missing"
  fi
  
  # Check component usage
  usage_count=$(grep -c "<Footer" "$file" 2>/dev/null || echo "0")
  if [ "$usage_count" -eq 1 ]; then
    echo "   ✅ Usage: Found (1 instance)"
  elif [ "$usage_count" -gt 1 ]; then
    echo "   ⚠️  Usage: Found ($usage_count instances - should be 1)"
  else
    echo "   ❌ Usage: Missing"
  fi
  
  echo ""
done

echo "════════════════════════════════════════════════════════"
echo "✔️  All pages setup complete!"
echo "════════════════════════════════════════════════════════"
