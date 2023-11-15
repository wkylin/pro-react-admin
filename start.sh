
cd ..
echo "" > front.log
nohup npm run dev > front.log &
echo "Start front complete!"
tail -f front.log
