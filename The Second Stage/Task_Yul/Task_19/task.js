/**
 * Created by �� on 2016/4/16.
 */
/*
 1 �����ÿһ�������������ó�����ͣһ�����У�javascriptû��sleep������������Ҫ�Լ�ȥʵ�������������ӵĻ��������ǿ�������Ĺ��̾���һ��һ���Ľ��еģ��Ͳ���һ˲�����������ˡ�

 2 ���ǿ���ͨ��ά��һ�����飬��ÿһ������֮������鱣���������������㷨����֮�������ٰѱ����ÿһ���������λ��Ƴ������������ʵ���õľ������ַ�����
 */

/*��ѡ����*/

function $(ele) {
    return document.querySelector(ele);
}
var queue = [];
var snapshots = []; //���ռ���
var timer = null; //��ʱ
var colors = ["#441d49", "#538289", "#a02730", "#73832a", "#005db1", "#10193a"];
var interval = $("#speed").value;

$(".chart").addEventListener("click", function(e) {
    var node = e.target;
    if (node && node.className.toLowerCase() === "bar") {
        var index = [].indexOf.call(node.parentNode.childNodes, node);
        queue.splice(index, 1);
        node.parentNode.removeChild(node);
    }
});

init();

function init() {
    initData(40);
    render();
}

$("#sort").onclick = function() {
    if (queue.length == 0) return alert("����Ϊ��");
    queue.bubbleSort();
    timer = setInterval(paint, interval); //��ʱ����
    function paint() {
        var snapshot = snapshots.shift() || [];
        if (snapshot.length !== 0) {
            render(snapshot);
        } else {
            clearInterval(timer); //���ƽ���
            return;
        }
    }
}

$("#left-in").onclick = function() {
    try {
        queue.unshift(getInputValue());
    } catch (e) {
        alert(e.message);
    }
    render();
}
$("#right-in").onclick = function() {
    try {
        queue.push(getInputValue());
    } catch (e) {
        alert(e.message);
    }
    render();
}
$("#left-out").onclick = function() {
    if (queue.length === 0) return alert("����Ϊ��");
    queue.shift();
    render();
}
$("#right-out").onclick = function() {
    if (queue.length === 0) return alert("����Ϊ��");
    queue.pop();
    render();
}
$("#random").onclick = function() {
    initData(40);
    render();
}

function bubbleSort(arr) {
    snapshots = [];
    if (arr.length < 1) {
        return arr;
    }
    var temp;
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                temp = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = temp;
                snapshots.push(JSON.parse(JSON.stringify(arr))); // ��¼����
            }
        }
    }
    return arr;
}

Array.prototype.bubbleSort = function() {
    return bubbleSort(this);
}
//�������60��10~100����
function initData(number) {
    queue = [];
    for (var i = 0; i < number; i++) {
        queue.push(Math.floor(Math.random() * 90 + 10));
    }
}
//��Ⱦ����
function render(arr) {
    var array = arr || queue;
    var content = array.map(function(v) {
        return "<div class='bar' style='height:" + (v * 3) + "px; background-color:" + getColor(v) + "'></div>";
    }).join("");
    $(".chart").innerHTML = content;
}

function getInputValue() {
    if (queue.length >= 60) throw new Error("���г��ȳ���60");
    var value = $("#number").value.trim();
    if (!isNumber(value)) throw new Error('����ֵ��Ч');
    value = parseInt(value);
    if (value < 10 || value > 100) throw new Error('����ֵԽ��');
    return value;
}
//��֤�����Ƿ�Ϊ����
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

//����ֵ�Ĵ�Сѡ����ɫ
function getColor(value) {
    if (!isNumber(value)) {
        return;
    }
    if (value < 60) {
        return colors[0];
    } else if (value >= 60 && value < 70) {
        return colors[1];
    } else if (value >= 70 && value < 80) {
        return colors[2];
    } else if (value >= 80 && value < 90) {
        return colors[3];
    } else if (value >= 90 && value < 100) {
        return colors[4];
    } else if (value === 100) {
        return colors[5];
    }
}