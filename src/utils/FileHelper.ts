/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   FileHelper.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/15 13:47:28 by alle.roy          #+#    #+#             */
/*   Updated: 2023/02/02 22:08:16 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import fs from "node:fs"

export default class FileHelper {
    public search(path: string): string {
        return fs.readFileSync(path, 'utf-8')
    }
}