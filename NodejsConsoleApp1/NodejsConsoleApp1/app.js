'use strict';

// ������� �������: �������� �������

let matrix = [
    [6, 4, 6, 5, 7, 4],
    [5, 2, 3, 6, 6, 7]
];

//--------------------------------------------

// �������� �� �������� ������� �������

if (matrix.length == 3) { //���� � ������� ��� ������ �� ���� ������

    // ���������� min ��������� � 1 � 3 ������� � max �� 2

    let min1 = Math.min.apply(null,matrix[0]);
    let min3 = Math.min.apply(null, matrix[2]);
    let max2 = Math.max.apply(null, matrix[1]);

    //.......................................................

    // �������� ����� �� ������ � ���� �������

    if (min1 >= max2) { //���� ��� ������� 1 ������ ������ ���� ����� ���� �������� 2 �� ���� ������
        let sum = [];
        for (let i = 0; i < matrix[0].length; i++) { //��� ������� �������� ������
            sum.push(matrix[0][i] + matrix[1][i]);   //���������� ������� 1 � 2 ������
        }
        matrix = [sum, matrix[2]]; //������� ������� �� ���������� ����� � 3 ������
    } else if (min3 >= max2) { //���� ��� ������� 3 ������ ������ ���� ����� ���� �������� 2 �� ���� ������
        let sum = [];
        for (let i = 0; i < matrix[0].length; i++) { //��� ������� �������� ������
            sum.push(matrix[2][i] + matrix[1][i]);   //���������� ������� 3 � 2 ������
        }
        matrix = [matrix[0], sum]; //������� ������� �� ���������� ����� � 1 ������
    } else {
        console.log('���������� ������ ������ � ���� �������! ���������� ������ ������ ������.');

        //���������� ���������

        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.on('data', process.exit.bind(process, 0));
        return false;

        //=======================

    }

    //.......................................................

} else if (matrix.length !== 2) { //���� � ������� �� ��� ������ �� ���� ������
    console.log('������� ������ ��������� �� ����� ���� � �� ����� ���� �����!');

    //���������� ���������

    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', process.exit.bind(process, 0));
    return false;

    //==============================

}

//--------------------------------------------

//������� ������ ������� ��������� ���������� ����� ������� �������

let optim = [[], [], []]; //������� ��������� ����������
let num = []; //������ ������� ��������

for (let i = 0; i < matrix[0].length; i++) { //��� ������� �������� ������
    num.push(i + 1);  //��������� ����� �������
    optim[0].push(0); //��������� ������� ������
    optim[1].push(0);
    optim[2].push(0);
}

//--------------------------------------------

let length = matrix[0].length; //�������� ����� ������

//������� ���������� ��������

for (let i = 0, k = 0, j = 0, index = []; 0 < matrix[0].length; i++) { //��� ������� �������� ������

    let el = []; //������ ��������� �� ��������������� ������
    let index = []; //������ ��������
    
    if (Math.min.apply(null, matrix[0]) <= Math.min.apply(null, matrix[1])) { //���� min ������� ��������� � ������ ������

        //�������� ��� �������� � ����������� ��������� � ������ ������

        matrix[0].filter((el, ind) => {
            if (el == Math.min.apply(null, matrix[0])) index.push(ind);
            return el;
        });

        //.......................................................

        //������� ������ �������������� ��������� �� ������ ������

        for (let a = 0; a < index.length; a++) {
            el.push(matrix[1][index[a]]);
        }

        //.......................................................

        //��������� �������� �� �������������� ����� � ����� �������

        for (let a = 0, ind = 0; a < index.length; a++) {
            ind = el.indexOf(Math.max.apply(null, el)); //������� ������ ������������� �� �� ������ ������

            //������� ������� 1 � 2 ������ � �� �����

            optim[0].splice(k, 1, num[index[ind]]);
            optim[1].splice(k, 1, matrix[0][index[ind]]);
            optim[2].splice(k, 1, matrix[1][index[ind]]);

            //========================================

            el.splice(ind, 1); //��������� ��������� ������� �� �������
            k++; //������� ������� ��������� ���� �������� �����

            console.log("<�����: " + num[index[ind]] + "�����: " + optim[0].indexOf(num[index[ind]]));

            //��������� ������� 1 � 2 ������ � �� ����� �� ������� �������

            matrix[0].splice(index[ind], 1);
            matrix[1].splice(index[ind], 1);
            num.splice(index[ind], 1);

            //========================================
        }

        //.......................................................

    } else { //���� min ������� ��������� �� � ������ ������

        //�������� ��� �������� � ����������� ��������� �� ������ ������

        matrix[1].filter((el, ind) => {
            if (el == Math.min.apply(null, matrix[1])) index.push(ind);
            return el;
        });

        //.......................................................

        //������� ������ �������������� ��������� � ������ ������

        for (let a = 0; a < index.length; a++) {
            el.push(matrix[0][index[a]]);
        }

        //.......................................................

        //��������� �������� �� �������������� ����� � ����� �������

        for (let a = 0, ind = 0; a < index.length; a++) {
            ind = el.indexOf(Math.max.apply(null, el)); //������� ������ ������������� �� �� ������ ������

            //������� ������� 1 � 2 ������ � �� �����

            optim[0].splice(length - j - 1, 1, num[index[ind]]);
            optim[1].splice(length - j - 1, 1, matrix[0][index[ind]]);
            optim[2].splice(length - j - 1, 1, matrix[1][index[ind]]);

            //========================================

            el.splice(ind, 1); //��������� ��������� ������� �� �������
            j++; //������� ������� ��������� ���� �������� ������

            console.log(">�����: " + num[index[ind]] + "�����: " + optim[0].indexOf(num[index[ind]]));

            //��������� ������� 1 � 2 ������ � �� ����� �� ������� �������

            matrix[0].splice(index[ind], 1);
            matrix[1].splice(index[ind], 1);
            num.splice(index[ind], 1);

            //========================================
        } 

        //.......................................................
    }
    
}

//--------------------------------------------

console.log("����������� �������: " + optim[0].join(' - ') + ".");

//������� ����� ����� � �������

for (var i = 0, sum1 = 0, sum2 = optim[1][0], prost = optim[1][0]; i < optim[0].length; i++) { //��� ������� �������� ������

    sum1 = sum1 + optim[1][i]; //���������� ������� ������ ������

    while (sum1 > sum2) { //���� ����� ������ ������ ������ ����� ������
        sum2 = sum2 + 1;  //���������� �� ������ ����� 1
        prost++;          //� 1 � �������
    }

    sum2 = sum2 + optim[2][i]; //���������� ������� ������ ������
}

//--------------------------------------------

console.log("����� �����: " + sum2 + "�������: " + prost);